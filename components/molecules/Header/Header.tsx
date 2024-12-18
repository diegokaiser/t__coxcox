import Image from 'next/image';

const Header = () => {
  return (
    <div className="flex justify-center p-4">
      <Image
        src="/assets/images/logo_web.png"
        alt="Restaurante Mexicano El Pastor"
        priority
        height={263}
        width={350}
      />
    </div>
  );
};

export default Header;
