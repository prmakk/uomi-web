import{j as e}from"./index-FFpusR3M.js";const o={title:"How OPoC Consensus drives the security of UOMI’s autonomous on-chain AI economic agents",description:"UOMI’s autonomous on-chain AI agents can manage assets, make decisions, and operate independently. With OPoC and TSS, we ensure a secure, self-sufficient system for these agents.",date:new Date("2024-10-29").getTime(),image:"/assets-blog/opoc.png"};function i(n){const t={h2:"h2",img:"img",li:"li",ol:"ol",p:"p",ul:"ul",...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.h2,{children:"What is OPoC?"}),`
`,e.jsx(t.p,{children:"Optimistic Proof of Computation (OPoC) is a consensus algorithm designed for secure and efficient decentralized computation, particularly within AI and machine learning contexts. This algorithm ensures computations are performed correctly without requiring every node in the network to verify each computation, thereby significantly reducing the computational overhead."}),`
`,e.jsx(t.h2,{children:"Why is OPoC Important?"}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsxs(t.li,{children:[`
`,e.jsx(t.p,{children:"Economic Security: The UOMI Network empowers autonomous AI agents capable of controlling and transacting valuable digital assets (Tokens, NFTs, Voting Rights, and more… on any blockchain). Such value also represents incentives for bad actors to try to game the system. With OPoC, validators are required to stake tokens, which are forfeited if they attempt to propagate incorrect computations. This economic incentive/disincentive system ensures that validators act honestly, supporting the integrity of the network."}),`
`]}),`
`,e.jsxs(t.li,{children:[`
`,e.jsx(t.p,{children:"Efficiency: Traditional consensus algorithms like Proof of Work (PoW) and Proof of Stake (PoS) require substantial computational resources and can be inefficient for intensive tasks like AI model computations. OPoC reduces this burden by verifying computations only on a subset of validators population, scaling to the whole network only if disagreements arise among the first subset."}),`
`]}),`
`,e.jsxs(t.li,{children:[`
`,e.jsx(t.p,{children:"Scalability: With PoS and PoW, increasing the number of nodes of the network does not increase it’s computational capability, with OPoC as the number of validators (nodes) in the network increases, the parallel computation capability of the network scales proportionally."}),`
`]}),`
`]}),`
`,e.jsx(t.h2,{children:"How OPoC Works:"}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsxs(t.li,{children:[`
`,e.jsx(t.p,{children:"Two-Stage Process:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[`
`,e.jsx(t.p,{children:"Stage 1: Probabilistic Assurance: A small, randomly selected subset of validators performs the computation. If they all agree, the result is accepted."}),`
`]}),`
`,e.jsxs(t.li,{children:[`
`,e.jsx(t.p,{children:"Stage 2: Dispute Resolution: If there is a disagreement among the initial validators set, a larger subset is involved to resolve the conflict and determine the correct computation; the dishonest validator’s stake gets slashed"}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(t.li,{children:[`
`,e.jsx(t.p,{children:"Probabilistic Guarantees:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[`
`,e.jsx(t.p,{children:"A potential attacker controlling multiple validators will have to answer the following question: what is the probability that only my validators will be selected for an inference? Rephrasing the concept, what is the probability that not even one of the randomly selected subset of validators is honest?"}),`
`]}),`
`,e.jsxs(t.li,{children:[`
`,e.jsx(t.p,{children:"The rational attacker would never attack if the potential reward for succeeding is less than its value at stake (staking requirement to run a validator) weighted by its probability of success. To make a simple example, a rational attacker with 100 at stake and 10% probability of success in gaming the system would require at least (100/10%) = 1000 as defecting reward in order to attempt an attack."}),`
`]}),`
`,e.jsxs(t.li,{children:[`
`,e.jsx(t.p,{children:"This means that an autonomous AI agent powered by the OPoC consensus algorithm is secure for any transaction that involves a value inferior to the minimal defecting reward for a rational attacker. Now the important question is, how big is this value?"}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(t.h2,{children:"Statistics of OPoC:"}),`
`,e.jsx(t.p,{children:"To calculate the minimal defecting reward for a rational attacker of an OPoC-powered network, and thus the economic security of an inference we need to define two numbers: the value at stake and the probability that not even one of the selected subset of validators is honest. The statistical formula used to calculate such a probability is called Hypergeometric Distribution:"}),`
`,e.jsx(t.p,{children:e.jsx(t.img,{src:"/assets-blog/opoc-equation.png",alt:"UOMI"})}),`
`,e.jsx(t.p,{children:"Looks like a scary formula but the underlying logic is quite simple, let’s go through it with an example, imagine you have a bag with 100 balls:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"66 white balls (honest validators)"}),`
`,e.jsx(t.li,{children:"34 black balls (dishonest validators)"}),`
`,e.jsx(t.li,{children:"You randomly pick 10 balls from the bag."}),`
`]}),`
`,e.jsx(t.p,{children:"You want to find out the chance that all ten selected balls are black (all dishonest validators). Intuitively, the chance of picking 0 white balls (all black) is very low. It's like picking 10 balls and all of them being black when you have mostly white balls in the bag. But how low is this chance?"}),`
`,e.jsx(t.p,{children:"To find it out the Hypergeometric Distribution formula uses combinations (ways to pick balls). Here's how it works:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Calculate ways to pick 0 white balls from 66."}),`
`,e.jsx(t.li,{children:"Calculate ways to pick 10 black balls from 34."}),`
`,e.jsx(t.li,{children:"Multiply the former two"}),`
`,e.jsx(t.li,{children:"Divide by the total ways to pick 10 balls from 100."}),`
`]}),`
`,e.jsx(t.p,{children:"When you do the math, the chance is very, very tiny: about 0.0000075."}),`
`,e.jsx(t.p,{children:"Coming back to our question on the economic security of each inference and assuming a stake of 10k $ per node (the UOMI network will require more), we can calculate that a rational attacker would need a defecting reward of at least 10.000/0.0000075 = 1.320.106.382 $ to run the attack. So, an attack on any AI agent who controls a smaller value would be inconvenient for any attacker."}),`
`,e.jsx(t.p,{children:"An interesting feature of OPoC is that the level of economic security is flexible, so an AI agent publisher can decide what is the level of economic security he requires depending on the application. For a simple chatbot, for example, a very small amount of security is needed and a subset of two or even one node would be enough, but if the agent is primed to transact digital assets, a DeFi AI agent for example, a substantial amount of security can be recruited by requiring multiple nodes to run the computation."})]})}function s(n={}){const{wrapper:t}=n.components||{};return t?e.jsx(t,{...n,children:e.jsx(i,{...n})}):i(n)}export{s as default,o as metadata};
