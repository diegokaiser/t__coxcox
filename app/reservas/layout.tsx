import { Header } from '@/components/molecules';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center">
      <div className="container flex justify-center">
        <div className="w-4/12">
          <Header />
          <div className="flex justify-center w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
