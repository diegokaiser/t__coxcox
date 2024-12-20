import { Header } from '@/components/molecules';

export default function ReservasLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center">
      <div className="container flex justify-center">
        <div className="w-11/12 sm:w-4/12">
          <Header />
          <div className="flex justify-center w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
