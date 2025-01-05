import sql from "better-sqlite3";

interface MealType {
  id: string;
  title: string;
  slug: string;
  image: string;
  summary: string;
  creator: string;
  creator_email: string;
  instructions: string;
}

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // throw error("Loading meals failed");
  const data: unknown[] = db.prepare("SELECT * FROM meals").all();
  return data as MealType[];
}

export function getMeal(slug: string) {
  const data: unknown = db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
  return data as MealType;
}
