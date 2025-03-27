import { Link, useLocation } from 'react-router-dom'
import './NavBar.css'

type NavBarProps = {
    setIsLiked: (checked: boolean) => void
}

export const NavBar = ({ setIsLiked }: NavBarProps) => {
    const location = useLocation();
    return (
        <nav className='nav'>
            <Link to={'/'}>Home</Link>
            <Link to={'/products'}>Products</Link>
            <Link to={'/create-product'}>Add new Product</Link>
            {(location.pathname === '/products') ? <label className="checkbox-ios">
                <input type="checkbox" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setIsLiked(event.target.checked)
                }} />
                <span className="checkbox-ios-switch"></span>
                Selected
            </label> : <></>}


        </nav>
    )
}