import React from "react";

import PageContainer from "../components/PageContainer";
import PageLatex from "../components/PageLatex";
import PageDownload  from "../components/PageDownload";

export default function Index() {
  return (
    <>
      <PageContainer>
        <PageLatex latex='/latex/deterministic-indeterminism.tex' />
        <PageDownload url='https://github.com/Uomi-network/uomi-whitepaper/blob/main/Deterministic-Indeterminism.pdf' label='Download PDF' />
      </PageContainer>
    </>
  );
};
