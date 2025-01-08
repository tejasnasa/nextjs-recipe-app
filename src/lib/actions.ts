"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

interface MealType {
  title: string;
  instructions: string;
  image: File;
  summary: string;
  creator: string;
  creator_email: string;
}

export async function shareMeal(formData: any) {
  const meal: MealType = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    creator: formData.get("name"),
    image: formData.get("image"),
    creator_email: formData.get("email"),
  };

  await saveMeal(meal);
  redirect("/meals");
}
