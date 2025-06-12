import PageContainer from "./PageContainer";
import PageLatex from "./PageLatex";
import PageDownload  from "./PageDownload";

export default function Index() {
  return (
    <>
      <PageContainer>
        <PageLatex latex='/latex/whitepaper.tex' />
        <PageDownload url='https://github.com/Uomi-network/uomi-whitepaper/blob/main/whitepaper.pdf' label='Download PDF' />
      </PageContainer>
    </>
  );
};
