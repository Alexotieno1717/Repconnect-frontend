import { Link } from 'react-router-dom';
interface BreadcrumbProps {
    pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
    return (
        <div className="mb-6 flex justify-between gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-title-md font-semibold text-black">
                {pageName}
            </h2>

            <nav>
                <ol className="flex items-center gap-2 text-sm ">
                    <li className='text-black'>
                        <Link to="/dashboard">Dashboard /</Link>
                    </li>
                    <li className="text-primary">{pageName}</li>
                </ol>
            </nav>
        </div>
    );
};

export default Breadcrumb;
