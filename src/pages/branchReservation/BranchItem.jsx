import { useNavigate } from "react-router-dom";
import { ConmmonButton } from "../../components/CommonButton";

const BranchItem = () => {
  const navigate = useNavigate();
  return (
    <>
      <p>목록</p>
      <ConmmonButton
        onClick={() => {
          navigate("/branchies/info");
        }}
      >
        상세보기 ▶
      </ConmmonButton>
    </>
  );
};
export default BranchItem;
