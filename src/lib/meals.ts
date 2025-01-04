import sql from "better-sqlite3";

interface MealType {
  id: string;
  title: string;
  slug: string;
  image: string;
  summary: string;
  creator: string;
}

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const data: unknown[] = db.prepare("SELECT * FROM meals").all();
  return data as MealType[];
}
