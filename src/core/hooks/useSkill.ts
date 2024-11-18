import { useContext } from "react";
import { SkillContext } from "../contexts/SkillContext";

const useSkill = () => {
  const context = useContext(SkillContext);

  if (!context) {
    throw new Error("useSkill must be used within a SkillProvider");
  }

  return context;
};

export default useSkill;
