import { useLocation } from 'react-router-dom';

function Footer() {
    const location = useLocation()

    const nowyear = new Date().getFullYear()

    return (
        <>
      {location.pathname === '/sign-up' ?(<></>) : location.pathname === '/sign-in' ?(<></>):
           (<footer className="footer">
              <p className="footer__copyright">&copy; {nowyear} Mesto Russia</p>
            </footer>)
      }
    </>
    )
}

export default Footer