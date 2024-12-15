'use client'
import React, { useState, ChangeEvent } from "react";

const ImageUploader: React.FC = () => {
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const MAX_FILE_SIZE = 500 * 1024; // 500KB

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        const compressedImage = await compressImage(file);
        if (compressedImage.size > MAX_FILE_SIZE) {
          setErrorMessage("File is too large, even after compression.");
          setCompressedFile(null);
          return;
        }
        setCompressedFile(compressedImage);
        setErrorMessage("");
      } else {
        setCompressedFile(file);
        setErrorMessage("");
      }
    }
  };

  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            console.error("Canvas context could not be created.");
            return resolve(file); // Fallback: return original file if canvas fails
          }

          const MAX_WIDTH = 800; // Resize width
          const scaleFactor = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleFactor;

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(new File([blob], file.name, { type: file.type }));
              } else {
                resolve(file); // Fallback: return original file if blob creation fails
              }
            },
            file.type,
            0.7 // Compression quality
          );
        };
      };
    });
  };

  const handleUpload = () => {
    if (compressedFile) {
      // Implement your upload logic here
      console.log("Uploading:", compressedFile);
      alert("Image ready for upload!");
    }
  };

  return (
    <div className="mt-20">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button
        onClick={handleUpload}
        disabled={!compressedFile}
      >
        Upload
      </button>
    </div>
  );
};

export default ImageUploader;
