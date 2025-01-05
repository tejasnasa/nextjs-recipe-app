"use client";

import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

interface ImagePickerProps {
  label: string;
  name: string;
}

export default function ImagePicker({ label, name }: ImagePickerProps) {
  const [image, setImage] = useState<string | undefined>();
  const imageInput = useRef<HTMLInputElement | null>(null);

  const handlePickClick = () => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setImage(undefined);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setImage(fileReader.result as string);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!image && <p>No image picked yet</p>}
          {image && <Image src={image} alt="selected image" fill/>}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg, image/jpg"
          name="image"
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
