import classNames from "classnames/bind";
import styles from './Breadcrumb.module.scss'

interface breadProps {
    items : Array<{title? : string | JSX.Element}>
}

const cx = classNames.bind(styles)
function Breadcrumb({items,...props}: breadProps) {
    
    return ( <ul className={cx('w-full bg-transparent flex flex-row justify-start py-5')} {...props}>
        {
            items.map((item,index) => {
                return <li className={cx('bread-item')} key={index}>{item.title}</li>
            })
        }
    
    </ul> );
}

export default Breadcrumb;