import SearchBar from './SearchBar'
import CompaniesTable from './CompaniesTable'
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const AdminCompaniesPage = () => {
    return (
        <div>
            <Navbar />

        <div className="pt-20 pb-20 px-6 space-y-10 min-h-screen bg-gray-50">
            <SearchBar />

            <CompaniesTable />
        </div>
        
            <Footer />
        </div>
    );
};

export default AdminCompaniesPage;
