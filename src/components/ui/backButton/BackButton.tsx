import s from "./BackButton.module.scss";
import { useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();
  const back = () => navigate(-1);

  return (
    <div className={s.backbutton} onClick={back}>
      <p>Back</p>
    </div>
  );
};
