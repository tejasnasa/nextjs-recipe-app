import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

interface GetMealType {
  id: string;
  title: string;
  image: string;
  summary: string;
  creator: string;
  creator_email: string;
  instructions: string;
  slug: string;
}

interface SaveMealType {
  title: string;
  image: string;
  summary: string;
  creator: string;
  creator_email: string;
  instructions: string;
  slug: string;
}

interface InitMealType {
  title: string;
  image: File;
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
  return data as GetMealType[];
}

export function getMeal(slug: string) {
  const data: unknown = db
    .prepare("SELECT * FROM meals WHERE slug = ?")
    .get(slug);
  return data as SaveMealType | null;
}

export async function saveMeal(mealx: InitMealType) {
  const meal: SaveMealType = {
    title: mealx.title,
    image: "",
    summary: mealx.summary,
    creator: mealx.creator,
    creator_email: mealx.creator_email,
    instructions: mealx.instructions,
    slug: "",
  };

  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = mealx.image.name.split(".").pop();
  const filename = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${filename}`);
  const bufferedImage = await mealx.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed");
    }
  });

  meal.image = `/images/${filename}`;

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run(meal);
}
