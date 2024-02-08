import { db } from "../db";

describe("when connecting to the postgres db", () => {
  it("should connect succefully ", async () => {
    try {
      await db.query("SELECT Now()");
      expect(true).toBe(true);
    } catch (error) {
      console.log("error connecting to db");
      expect(true).toBe(false);
    }
    // finally {
    //   await db.close();
    // }
  });
});
