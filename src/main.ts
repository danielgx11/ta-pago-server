import "reflect-metadata";
import app from "./app";

const start = async (): Promise<void> => {
  try {
    app.listen(process.env.PORT || 3333, () => {
      console.log("Server started on port 3333");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();
