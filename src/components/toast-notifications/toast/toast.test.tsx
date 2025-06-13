import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { NotificationsProvider } from "../../../context/notifications";

import ToastNotification, { ToastNotificationProps } from ".";

describe("Toast Notification", () => {
  const user = userEvent.setup();
  it("should render success toast notification", () => {
    const props: ToastNotificationProps = {
      notification: {
        title: "success",
        id: "1",
        description: "This is a success message",
      },
      index: 0,
    };
    render(
      <NotificationsProvider>
        <ToastNotification {...props} />
      </NotificationsProvider>
    );
    const toastElement = screen.getByRole("status");
    expect(toastElement).toBeVisible();
    expect(screen.getByRole("heading", { name: "success" })).toBeVisible();
    expect(screen.getByText("This is a success message")).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Close notification" })
    ).toBeVisible();
  });

  it("should render error toast notification", () => {
    const props: ToastNotificationProps = {
      notification: {
        title: "error",
        id: "2",
        description: "This is an error message",
      },
      index: 1,
    };
    render(
      <NotificationsProvider>
        <ToastNotification {...props} />
      </NotificationsProvider>
    );
    const toastElement = screen.getByRole("status");
    expect(toastElement).toBeVisible();
    expect(screen.getByRole("heading", { name: "error" })).toBeVisible();
    expect(screen.getByText("This is an error message")).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Close notification" })
    ).toBeVisible();
  });

  it("should close notification when close button is clicked", async () => {
    const props: ToastNotificationProps = {
      notification: {
        title: "success",
        id: "3",
        description: "This is an success message",
      },
      index: 2,
    };
    render(
      <NotificationsProvider>
        <ToastNotification {...props} />
      </NotificationsProvider>
    );
    expect(screen.queryByRole("status")).toBeVisible();

    const closeButton = screen.getByRole("button", {
      name: "Close notification",
    });
    await user.click(closeButton);
    waitFor(() => {
      expect(screen.queryByRole("status")).not.toBeVisible();
    });
  });
});
