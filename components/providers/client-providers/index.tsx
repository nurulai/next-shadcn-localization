import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from './theme-provider';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}