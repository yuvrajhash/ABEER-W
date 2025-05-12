import ThemeNavbar from '../components/ThemeNavbar';
import ThemeFooter from '../components/ThemeFooter';

export default function ThemeDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeNavbar />
      <main className="min-h-screen pt-16">
        {children}
      </main>
      <ThemeFooter />
    </>
  );
}
