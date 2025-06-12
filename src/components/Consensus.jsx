import React from "react";


import PageContainer from "./PageContainer";
import PageDownload from "./PageDownload";
import PageLatex from "./PageLatex";

export default function Consensus() {
  return (
    <>
      <PageContainer>
        <PageLatex latex='/latex/consensus.tex' />
        <PageDownload url='https://github.com/Uomi-network/uomi-whitepaper/blob/main/consensus.pdf' label='Download PDF' />
      </PageContainer>
    </>
  );
};
