"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

interface MealType {
  title: string;
  instructions: string;
  image: File;
  summary: string;
  creator: string;
  creator_email: string;
}

function isInvalidText(text: string | null | undefined): boolean {
  return !text || text.trim() === "";
}

export async function shareMeal(
  prevStatus: { message: string },
  formData: FormData
): Promise<{ message: string }> {
  const meal: MealType = {
    title: formData.get("title") as string,
    summary: formData.get("summary") as string,
    instructions: formData.get("instructions") as string,
    creator: formData.get("name") as string,
    image: formData.get("image") as File,
    creator_email: formData.get("email") as string,
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@")
  ) {
    return {
      message:
        "Invalid input: All fields are required and must be properly formatted.",
    };
  }

  if (!meal.image || !(meal.image instanceof File) || meal.image.size === 0) {
    return {
      message: "Invalid input: A valid image is required.",
    };
  }

  await saveMeal(meal);

  revalidatePath("/meals");
  redirect("/meals");
}
