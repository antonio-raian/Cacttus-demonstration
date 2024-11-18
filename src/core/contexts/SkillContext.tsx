"use client";

import { Skill } from "@prisma/client";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { createSkill, getSkills } from "../services/skillService";
import { useUser } from "../hooks";

type SkillContextType = {
  skills: Skill[];
  _createSkill: (
    skill: Omit<Skill, "id" | "createdAt" | "updatedAt">
  ) => Promise<Skill>;

  setSearchTerm: (term: string) => void;
  searchTerm: string;
};

export const SkillContext = createContext<SkillContextType | undefined>(
  undefined
);

const SkillProvider = ({ children }: { children: ReactNode }) => {
  const { setError } = useUser();

  const [skills, setSkills] = useState<Skill[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const _getAllSkills = useCallback(async () => {
    try {
      const skills = await getSkills();
      setSkills(skills);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      throw error;
    }
  }, [setError]);

  useEffect(() => {
    _getAllSkills();
  }, [_getAllSkills]);

  const _createSkill = useCallback(
    async (skill: Omit<Skill, "id" | "createdAt" | "updatedAt">) => {
      const newSkill = await createSkill(skill);
      setSkills([...skills, newSkill]);
      return newSkill;
    },
    [skills]
  );

  const _filterSkills = useCallback(() => {
    const lowerSearch = searchTerm.toLowerCase();

    return skills.filter((skill) =>
      skill.name.toLowerCase().includes(lowerSearch)
    );
  }, [searchTerm, skills]);

  return (
    <SkillContext.Provider
      value={{
        get skills() {
          if (!searchTerm) return skills;
          return _filterSkills();
        },
        _createSkill,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </SkillContext.Provider>
  );
};

export default SkillProvider;
