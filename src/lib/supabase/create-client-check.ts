import { createClient } from "@/lib/supabase/server";

// Retries up to 3 times to initialize the Supabase client and execute the callback.
// Logs errors with detailed messages and stack trace for debugging, and gracefully handles failures.

export const createClientCheck = async <T>(
  callback: (supabase: Awaited<ReturnType<typeof createClient>>) => Promise<T>,
  retries = 3
): Promise<T | null> => {
  while (retries > 0) {
    try {
      const supabase = await createClient();

      if (!supabase) throw new Error("Failed to initialize Supabase client");

      const result = await callback(supabase);
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(
          `Supabase query failed, retries left ${retries - 1}. Error: ${
            error.message
          }`
        );
        if (error.stack) console.debug(error.stack);
      } else {
        console.error("Unknown error occurred:", error);
      }

      retries--;
      if (retries === 0) {
        console.error("All retries failed.");
        return null;
      }
      // 500ms delay before retrying
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  return null;
};
