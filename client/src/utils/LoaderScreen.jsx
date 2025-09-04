import { Loader2 } from "lucide-react";
import "./LoaderScreen.css";

const LoaderScreen = ({ message}) => {
  return (
    <div className="loader-screen">
      <Loader2 className="loader-icon" />
      <p className="loader-text">{message}</p>
    </div>
  );
};

export default LoaderScreen;
