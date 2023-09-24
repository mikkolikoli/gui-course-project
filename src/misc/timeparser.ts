export const TimeParser = {
  parse(time: string): Time | null {
    // regex for time in format HH:MM (chatGPT)
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    const match = time.match(timeRegex);
    if (match) {
      const [hour, minute] = match[0].split(":");
      return {
        hour: parseInt(hour) as Hour,
        minute: parseInt(minute) as Minute,
      };
    }
    return null;
  },
};
