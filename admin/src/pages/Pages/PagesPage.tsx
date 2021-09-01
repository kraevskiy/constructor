import { CreatePageForm, PageHead } from '../../components/';
import useFetch from '../../hooks/useFetch';
import { ICreatePageFormInterface } from '../../components/CreatePageForm/CreatePageForm.interface';
import { useEffect } from 'react';

const PagesPage = (): JSX.Element => {
  const apiUrl = `${process.env.REACT_APP_PAGE}/60d354e018d758d4fd67dbb1`;
  const [{response, isLoading}, doFetch] = useFetch<ICreatePageFormInterface>(apiUrl);

  useEffect(()=>{
    doFetch();
  }, [doFetch]);

  return (
    <div>
      <PageHead paddingTop="small">PagesPage (admin)</PageHead>
      {response && !isLoading && <CreatePageForm defaultData={response}/>}
    </div>
  );
};

export default PagesPage;
