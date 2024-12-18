import Image from 'next/image';

const Loading = () => {
  return (
    <>
      <Image
        src="/assets/icons/loader.svg"
        alt="loading..."
        height={24}
        width={24}
        className="ml-2 animate-spin"
      />
    </>
  );
};

export default Loading;
