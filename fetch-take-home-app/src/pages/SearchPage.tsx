import Display from '../components/Display';
import Search from '../components/Search';

function SearchPage() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen min-w-screen">
        <Search></Search>
        <Display></Display>
      </div>
    </>
  );
}

export default SearchPage;
