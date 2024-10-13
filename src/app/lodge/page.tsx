import LodgeCard from "@/components/route/lodge-route/LodgeCard"



const page: React.FC = () => {
  const message = "Hello from Parent!";
  return (
    <>
      <h1 className={`font-bold pb-4 sm:text-xl tracking-wide capitalize`}>Welcome! Find your lodge.</h1>
      <div className="sm:grid sm:grid-cols-4 sm:gap-5 flex flex-col gap-3">
          <LodgeCard message={message} />
          <LodgeCard message={message} />
          <LodgeCard message={message} />
          <LodgeCard message={message} />
          <LodgeCard message={message} />
          <LodgeCard message={message} />
          <LodgeCard message={message} />
          <LodgeCard message={message} />
          <LodgeCard message={message} />
          <LodgeCard message={message} />
          <LodgeCard message={message} />
      </div>
    </>

  )
}

export default page