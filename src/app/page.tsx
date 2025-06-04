import Link from "next/link"

const page = async () => {
  return (
    <div>
      <h1>Home</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A sit distinctio ipsum nulla non recusandae quod reprehenderit porro perferendis? Quam dolores, quidem in architecto praesentium perspiciatis nam porro enim unde, temporibus, quod nesciunt eaque veritatis incidunt quae impedit. Natus nam amet voluptas recusandae sequi delectus dignissimos quis. Rerum, libero. Animi.</p>
      
      <Link href="/todos" className="underline">To Dos</Link>
    </div>
  )
}

export default page