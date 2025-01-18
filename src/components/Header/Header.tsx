
import { useAuth } from '../../contexts/AuthContext'

export const Header = () => {
  const {userDetails} =useAuth()
    return (
    <nav className='p-3 bg-slate-200 w-full sticky flex justify-between items-center'>
        <h1 className='text-2xl text-gray-500'>Todo App</h1>
        <div className='rounded-md flex py-2 px-3 items-center gap-2'>
            <span className='text-xl'>{userDetails?.username}</span>
            <div className='rounded-full text-2xl w-[40px] aspect-square bg-slate-300 inline-flex justify-center items-center'>{userDetails?.username?.charAt(0)}</div>
        </div>
    </nav>
  )
}
