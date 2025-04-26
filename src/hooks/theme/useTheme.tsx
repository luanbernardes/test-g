import { themeService } from '@/services';
import { startTransition, useEffect, useState } from 'react';
import { themeEnum } from '@/@types/theme';

export const useTheme = () => {
  const [theme, setTheme] = useState<themeEnum>(themeEnum.LIGHT);

  useEffect(() => {
    startTransition(async () => {
      const response = await themeService.getThemeLocalStorage();

      if (response.body?.theme) {
        setTheme(response.body.theme);
      }
    });
  }, []);

  async function changeTheme(theme: themeEnum) {
    await themeService.postThemeLocalStorage(theme);

    setTheme(theme);
  }

  return {
    theme,
    changeTheme
  };
};
