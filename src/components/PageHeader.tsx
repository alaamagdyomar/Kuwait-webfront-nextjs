import Image from "next/image";
type Props = {
  img: string;
  title: string;
  description?: string;
};
export default function ({
  img = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply",
  title,
  description,
}: Props) {
  return (
    <div className={"flex justify-start items-end"}>
      <Image
        src={`${img}`}
        alt='picks'
        width={1000}
        height={400}
        className='absolute inset-0 -z-10 h-[30vh] lg:h-[45vh] xl:h-[50vh] w-full object-cover'
      />
      <div className='py-8 px-12 max-w-2xl  text-white flex flex-col  justify-end items-start h-[20vh] lg:h-[30vh] xl:h-[40vh]'>
        <h1 className='text-7xl  text-center  capitalize'>{title}</h1>
        {description && <p className='text-lg'>{description}</p>}
      </div>
    </div>
  );
}
