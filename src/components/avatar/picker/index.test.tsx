import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";

import AvatarPicker from "./index";

const mockSetError = vi.fn();
const mockClearError = vi.fn();
const mockOnSelect = vi.fn();

const renderAvatarPicker = (selectedAvatar?: string) => {
  render(
    <AvatarPicker
      onSelect={mockOnSelect}
      selectedAvatar={selectedAvatar}
      setError={mockSetError}
      clearError={mockClearError}
    />
  );
};

describe("AvatarPicker", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders upload label and button", () => {
    renderAvatarPicker();

    expect(
      screen.getByRole("heading", { name: /select an avatar/i })
    ).toBeVisible();
    expect(screen.getByText(/upload your own avatar/i)).toBeVisible();
    expect(screen.getByRole("button", { name: /choose image/i })).toBeVisible();
    expect(
      screen.queryByRole("button", { name: /clear/i })
    ).not.toBeInTheDocument();
  });

  it("calls onSelect with image data when a valid image is uploaded", async () => {
    // Mock FileReader
    const addEventListener = vi.fn();
    const readAsDataURL = vi.fn(function (this: any) {
      // Simulate async read
      setTimeout(() => {
        this.result = "data:image/png;base64,TEST";
        if (this.onload) this.onload({ target: this });
      }, 0);
    });
    (globalThis as any).FileReader = vi.fn(() => ({
      addEventListener,
      readAsDataURL,
      onload: undefined,
      result: undefined,
    }));

    renderAvatarPicker();
    const file = new File(["dummy"], "avatar.png", { type: "image/png" });
    const input = screen.getByLabelText(/upload your own avatar/i, {
      selector: "input",
    });
    await user.upload(input, file);
    // Wait for the async FileReader simulation
    await waitFor(() => {
      expect(mockOnSelect).toHaveBeenCalledWith("data:image/png;base64,TEST");
    });
  });

  it("calls setError for non-image file", async () => {
    renderAvatarPicker();
    const file = new File(["dummy"], "avatar.txt", { type: "text/plain" });
    const input = screen.getByLabelText(/upload your own avatar/i, {
      selector: "input",
    });
    await user.upload(input, file);

    waitFor(() => {
      expect(mockSetError).toHaveBeenCalledWith(
        "Please select a valid image file (JPG, PNG, GIF, or WEBP)."
      );
    });
  });

  it("calls setError for file too large", async () => {
    renderAvatarPicker();
    const file = new File(
      [new Array(2 * 1024 * 1024 + 1).join("a")],
      "avatar.png",
      { type: "image/png" }
    );
    Object.defineProperty(file, "size", { value: 2 * 1024 * 1024 + 1 });
    const input = screen.getByLabelText(/upload your own avatar/i, {
      selector: "input",
    });
    await user.upload(input, file);

    waitFor(() => {
      expect(mockSetError).toHaveBeenCalledWith(
        "Image is too large. Maximum size is 2MB."
      );
    });
  });

  it("calls clearError on image change and reset", async () => {
    renderAvatarPicker("data:image/png;base64,TEST");

    const input = screen.getByLabelText(/upload your own avatar/i, {
      selector: "input",
    });
    await user.upload(input, new File([], ""));

    waitFor(() => {
      expect(mockClearError).toHaveBeenCalled();
      const clearBtn = screen.getByRole("button", { name: /clear/i });

      user.click(clearBtn);
      expect(mockClearError).toHaveBeenCalled();
    });
  });

  it("shows preview and clear button when avatar is selected", () => {
    renderAvatarPicker("data:image/png;base64,TEST");
    expect(screen.getByAltText(/selected avatar preview/i)).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Reset avatar selection" })
    ).toBeVisible();
  });
});
