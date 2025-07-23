import { Link } from "react-router";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "./back-link.scss";

type BackLinkProps = {
  href: string;
  label: string;
};

const BackLink: React.FC<BackLinkProps> = ({ href, label }) => (
  <Link className="back-link" to={href}>
    <ArrowBackIcon />
    <span className="link-title">{label}</span>
  </Link>
);

export default BackLink;
