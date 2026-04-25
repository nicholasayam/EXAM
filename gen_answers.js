const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, BorderStyle, WidthType, ShadingType,
  Table, TableRow, TableCell, PageBreak, LevelFormat
} = require('docx');
const fs = require('fs');

// ── colour helpers ──────────────────────────────────────────────────────────
const BLK = (t,o={}) => new TextRun({text:t,font:'Arial',size:22,...o});
const BLD = (t,o={}) => new TextRun({text:t,font:'Arial',size:22,bold:true,...o});
const ITA = (t,o={}) => new TextRun({text:t,font:'Arial',size:22,italics:true,...o});
const PRP = (t,o={}) => new TextRun({text:t,font:'Arial',size:22,color:'7030A0',...o});   // strategic purple
const PRP_B=(t,o={}) => new TextRun({text:t,font:'Arial',size:22,color:'7030A0',bold:true,...o});
const AMB = (t,o={}) => new TextRun({text:t,font:'Arial',size:22,color:'C55A11',...o});   // evaluative amber
const RED = (t,o={}) => new TextRun({text:t,font:'Arial',size:22,color:'C00000',...o});   // warnings
const GRN = (t,o={}) => new TextRun({text:t,font:'Arial',size:22,color:'375623',...o});   // green for headings
const BLU = (t,o={}) => new TextRun({text:t,font:'Arial',size:22,color:'1F4E79',...o});   // case law

// paragraph builders
const p  = (...r) => new Paragraph({children:r, spacing:{after:140}});
const pb = (...r) => new Paragraph({children:r, spacing:{after:60,before:60}});
const pi = (...r) => new Paragraph({children:r, spacing:{after:100}, indent:{left:480}});
const pii= (...r) => new Paragraph({children:r, spacing:{after:80},  indent:{left:960}});
const SP = () => new Paragraph({children:[BLK('')], spacing:{after:100}});
const HR = () => new Paragraph({
  border:{bottom:{style:BorderStyle.SINGLE,size:6,color:'ADB9CA'}},
  spacing:{after:160,before:80}, children:[]
});
const PB = () => new Paragraph({children:[new PageBreak()]});

const H1 = t => new Paragraph({
  heading:HeadingLevel.HEADING_1,
  children:[new TextRun({text:t,font:'Arial',size:36,bold:true,color:'1A1A2E'})],
  spacing:{before:480,after:200}
});
const H2 = t => new Paragraph({
  heading:HeadingLevel.HEADING_2,
  children:[new TextRun({text:t,font:'Arial',size:28,bold:true,color:'1F3864'})],
  spacing:{before:280,after:140}
});
const H3 = t => new Paragraph({
  heading:HeadingLevel.HEADING_3,
  children:[new TextRun({text:t,font:'Arial',size:24,bold:true,color:'2E4053'})],
  spacing:{before:200,after:100}
});
const H4 = t => new Paragraph({
  heading:HeadingLevel.HEADING_4,
  children:[new TextRun({text:t,font:'Arial',size:22,bold:true,color:'34495E'})],
  spacing:{before:140,after:80}
});

// coloured side-bar boxes
const colorBox = (label, lines, bg, accent) => new Table({
  width:{size:9200,type:WidthType.DXA},
  columnWidths:[9200],
  rows:[new TableRow({children:[new TableCell({
    width:{size:9200,type:WidthType.DXA},
    shading:{fill:bg, type:ShadingType.CLEAR},
    margins:{top:100,bottom:100,left:140,right:100},
    borders:{top:{style:BorderStyle.SINGLE,size:2,color:accent},
             bottom:{style:BorderStyle.SINGLE,size:2,color:accent},
             left:{style:BorderStyle.SINGLE,size:8,color:accent},
             right:{style:BorderStyle.NONE}},
    children: lines
  })]})],
});
const pinkBox  = (label, lines) => colorBox(label, lines, 'FDE8F4','9B1F6E');
const purpBox  = (label, lines) => colorBox(label, lines, 'F0E6FF','7030A0');
const amberBox = (label, lines) => colorBox(label, lines, 'FFF3E0','C55A11');
const blueBox  = (label, lines) => colorBox(label, lines, 'EBF5FB','1F4E79');
const greenBox = (label, lines) => colorBox(label, lines, 'E8F5E9','1E8449');

const boxLabel = (t,c='1A1A2E') => new Paragraph({
  children:[new TextRun({text:t,font:'Arial',size:21,bold:true,color:c})],
  spacing:{after:70}
});
const boxLine  = (...r) => new Paragraph({children:r, spacing:{after:80}});
const boxLineI = (...r) => new Paragraph({children:r, spacing:{after:80}, indent:{left:360}});

// ── DOCUMENT ────────────────────────────────────────────────────────────────
const children = [

// =========================================================================
// COVER
// =========================================================================
H1('CAAL Constitutional Law — Model Answers'),
p(BLD('Sections covered:'),BLK(' AY2023–24 (Q3, Q4, Q5) and AY2024–25 (Q3, Q4)')),
p(BLK('Colour key: '),
  BLK('Black', {bold:true}), BLK(' — main argument | '),
  new TextRun({text:'Purple',font:'Arial',size:22,color:'7030A0',bold:true}), BLK(' — strategic/remedies advice | '),
  new TextRun({text:'Amber',font:'Arial',size:22,color:'C55A11',bold:true}), BLK(' — evaluative turning points / alternative positions | '),
  new TextRun({text:'Blue italics',font:'Arial',size:22,color:'1F4E79',italics:true}), BLK(' — case citations')),
HR(),

// =========================================================================
PB(),
H1('AY2023–24  SECTION B'),
// =========================================================================

pinkBox('EXAMINER FEEDBACK (AY2023–24 General)', [
  boxLabel('Key feedback across Section B', '9B1F6E'),
  boxLine(BLK('Q3: Take-up was LOW despite being one of the "easier" questions — straight application. Best answers: firm grasp of locus standi (O 24 ROC), Art 9 scope, Art 12 (which test — LMS vs Syed Suhail?). Examiners noted students missed opportunity.')),
  boxLine(BLK('Q4: Majority failed to engage with (1) the interpretive METHODS themselves. "Merely describing cases" or "narrow vs expansive" was insufficient. Must link method → constitutional supremacy/SOP. Include NON-fundamental-liberties cases (Tan Cheng Bock, Vellama, Wong Souk Yee).')),
  boxLine(BLK('Q5: Must address ALL THREE categories — POFMA (false speech), contempt (AJPA/Jolovan Wham), and defamation. Omitting contempt of court = automatic incompleteness. Use a clear thesis and answer the QUOTE directly.')),
]),
SP(),

// =========================================================================
PB(),
H1('AY2023–24 Q3 — Karem Constitutional Hypothetical'),
H2('Question'),
p(BLK('Advise Mr Karem as to whether he has any viable constitutional claims, including whether he would be able to establish locus standi, to challenge: (i) the constitutionality of the Efficient Delivery Act (EDA); (ii) the designation of his area as a drone delivery zone; and (iii) the acquisition notice under the Land Acquisition Act 1966.')),
pinkBox('Examiner Feedback — Q3 (AY23-24)', [
  boxLabel('What examiners rewarded', '9B1F6E'),
  boxLine(BLK('✓ Identifying the THREE discrete decisions to challenge separately')),
  boxLine(BLK('✓ Properly analysing locus standi under O 24 Rules of Court — including the Kenneth Jeyaretnam framework')),
  boxLine(BLK('✓ Correctly identifying the SCOPE of Art 9 (Lo Pui Sang; LMS; YVK 2015; TSK) and explaining WHY a privacy/property claim likely fails')),
  boxLine(BLK('✓ Applying the CORRECT Art 12 test: RCT (LMS) for legislation; Syed Suhail two-step for executive action')),
  boxLine(BLK('✓ Critiquing how Singapore courts have narrowed locus standi despite wide ambit of O 24')),
  boxLine(RED('✗ Common error: Applying the same Art 12 test across legislation, Ministerial designation, and acquisition without distinguishing each.')),
]),
SP(),

H2('A.  Preliminary: Structure of Claims'),
p(BLK('Karem faces three discrete decisions, each requiring separate analysis of standing and substantive constitutional grounds: (1) the EDA as legislation (Art 12 — RCT); (2) the Ministerial designation of the drone zone (Art 12 — executive action; Syed Suhail); and (3) the acquisition notice under the LAA (Art 12 — executive action + validity of "public purpose"). An Art 9 privacy claim cuts across all three but faces the highest doctrinal hurdle.')),

H2('B.  Locus Standi'),
H3('Applicable Framework'),
p(BLK('Standing for constitutional challenges in Singapore is governed by O 24 of the Rules of Court and the framework in '),ITA('Kenneth Jeyaretnam v AG',{color:'1F4E79'}),BLK(', which requires: (i) a public duty that has been breached; (ii) which generates correlative private rights ('),ITA('Tan Eng Hong',{color:'1F4E79'}),BLK(') or public rights ('),ITA('Vellama',{color:'1F4E79'}),BLK('). In cases where no correlative rights are generated, an applicant may still obtain standing at the court\'s discretion if the breach is of sufficient gravity and it is in the public interest for courts to hear the case.')),

H3('Karem\'s Standing'),
pi(BLD('Acquisition notice (strongest):'),BLK(' Karem holds a property right in the acquired land — this is a direct interference with a private right enforceable at law. His property is being compulsorily taken; the acquisition triggers a real and direct constitutional interest. Standing is clear.')),
pi(BLD('EDA designation:'),BLK(' Karem lives adjacent to the drone zone and the parking site. The designation directly affects his daily use and enjoyment of property. His complaint with the Ministry was rejected. He is '),ITA('directly affected',{bold:true}),BLK(' in a material, non-abstract way — not a mere "interested observer" ('),ITA('Tan Eng Hong',{color:'1F4E79'}),BLK(').')),
pi(BLD('EDA as legislation:'),BLK(' Standing to challenge legislation on Art 9/12 grounds requires showing a real and credible threat of deprivation of the relevant constitutional right ('),ITA('TSK v AG',{color:'1F4E79'}),BLK('). Since the acquisition is real and the EDA underpins both the designation and acquisition, Karem can plausibly link the legislation to his concrete harm — though this is the weakest of the three standing arguments.')),
amberBox('EVALUATIVE — Borderline Standing Issue', [
  boxLabel('Key tension: locus standi for EDA challenge', 'C55A11'),
  boxLine(BLK('Examiners noted courts have narrowed locus standi despite O 24\'s wide ambit. Karem\'s strongest hook is the acquisition — a tangible deprivation, not a mere chilling effect (per TSK\'s rejection of chilling effect-based standing). If the court declines to grant standing to challenge the EDA as legislation, Karem should redirect his energies to the executive actions, which are more amenable to review.')),
]),

H2('C.  Art 9(1) — Privacy and Enjoyment of Property'),
H3('Karem\'s Argument'),
p(BLK('Karem will argue that drones flying past his windows invade his privacy and autonomy, and that this constitutes a deprivation of "life or personal liberty" without lawful basis under Art 9(1).')),
H3('Likely Outcome: FAILS under current jurisprudence'),
pi(ITA('Lo Pui Sang',{color:'1F4E79'}),BLK(': Personal liberty under Art 9 refers only to freedom from unlawful incarceration/detention — does not incorporate personal liberty to contract, let alone a right to privacy.')),
pi(ITA('Lim Meng Suang v AG',{color:'1F4E79'}),BLK(' (CA): The right to privacy and personal autonomy ought not be read into the phrase "life or personal liberty" in Art 9(1).')),
pi(ITA('Tan Seng Kee v AG',{color:'1F4E79'}),BLK(' [2022]: Art 9(1) is engaged only where a provision actually or imminently deprives a person of life or personal liberty. A chilling effect or mere disruption to enjoyment of property does not engage Art 9(1). No freestanding constitutional protection for sexual identity — by analogy, no freestanding protection for property enjoyment either.')),
pi(ITA('Yong Vui Kong (2015)',{color:'1F4E79'}),BLK(': "Life" expanded to bodily integrity beyond mere detention. However, this extension relates to physical force against the person — not drone surveillance.')),
amberBox('EVALUATIVE — Can YVK (2015) be stretched?', [
  boxLabel('Alternative position — arguable but unlikely to succeed', 'C55A11'),
  boxLine(BLK('One could argue that persistent aerial surveillance through a window constitutes a physical intrusion into "personal security" (Blackstone\'s first absolute right, traced in YVK (2015)). The Court of Appeal in YVK acknowledged Blackstone\'s tripartite framework. However: (a) courts have explicitly refused to extend Art 9 to privacy (LMS (CA)); (b) TSK confirms unenumerated rights cannot be read in; (c) the court would likely characterise drone surveillance as a statutory/regulatory matter, not a constitutional Art 9 issue. Advise Karem NOT to lead with this — it is the weakest argument and may undermine credibility of the stronger Art 12 claims.')),
]),

H2('D.  Art 12(1) — Constitutionality of the EDA (Legislation)'),
H3('Test: Reasonable Classification Test — Lim Meng Suang formulation'),
p(BLK('Since the EDA is legislation, the two-limb RCT from '),ITA('Lim Meng Suang',{color:'1F4E79'}),BLK(' applies. Courts presume constitutionality as a starting point ('),ITA('Saravanan Chandaram',{color:'1F4E79'}),BLK(').')),
pi(BLD('Differentia:'),BLK(' Areas designated as drone delivery zones vs non-designated areas.')),
pi(BLD('Object:'),BLK(' Streamlining delivery services and reducing traffic congestion (EDA long title).')),
pi(BLD('Intelligible differentia:'),BLK(' Yes — the designation of specific zones based on proximity to delivery networks, road layouts, population density is capable of rational understanding.')),
pi(BLD('Rational relation:'),BLK(' Yes — designating delivery zones serves the stated purpose of efficient, contained drone operations. Courts do not require perfect coincidence ('),ITA('Taw Cheng Kong',{color:'1F4E79'}),BLK(').')),
p(BLK('Result: The EDA as legislation is '),BLD('likely to survive'),BLK(' the RCT. Unless the differentia is "so unreasonable as to be illogical and/or incoherent" (the limited legitimacy element in LMS), the court will not strike down the statute.')),
amberBox('EVALUATIVE — Any viable challenge to EDA as legislation?', [
  boxLabel('Potential argument: "Public purpose" limitation in Art 12(3)? No — consider instead:', 'C55A11'),
  boxLine(BLK('Karem could argue: the EDA classification is so broad as to be OVER-INCLUSIVE (sweeping in his residential neighbourhood as a drone zone when residential areas serving no delivery function are included). Per LMS (HC): over/under-inclusiveness weakens the rational nexus. However, courts allow imperfect fit. This argument is unlikely to succeed on the legislation itself. It is more potent at the EXECUTIVE ACTION stage (Ministerial designation).')),
]),

H2('E.  Art 12(1) — Ministerial Designation of Drone Parking Zone (Executive Action)'),
H3('Test: Syed Suhail Two-Step'),
p(BLK('The Minister\'s designation of the grass patch adjacent to Karem\'s house (rather than the vacant school site 250m away) as the drone parking zone is executive action. Apply '),ITA('Syed Suhail bin Syed Zin v AG',{color:'1F4E79'}),BLK(':')),
pi(BLD('Step 1:'),BLK(' Has Karem been treated differently from equally situated persons? The vacant school site 250m away appears equally (if not better) suitable for a drone parking zone — it is vacant, not adjacent to occupied residential property, and causes less disruption to existing residents. Karem\'s position is arguably equivalent to the school site\'s situation. This is a '),BLD('prima facie'),ITA(' case',{bold:true}),BLK(' of differential treatment.')),
pi(BLD('Step 2:'),BLK(' The burden shifts to the Minister to show the differential treatment was '),BLD('reasonable'),BLK(', bearing a sufficient rational relation to the object of the designation power. The Minister must justify choosing the grass patch/Karem\'s area over the school site.')),
amberBox('EVALUATIVE — Potential Ministerial justifications (borderline arguments)', [
  boxLabel('What the Minister might argue; how to rebut', 'C55A11'),
  boxLine(BLK('(a) Contiguity: Grass patch + Karem\'s land = contiguous parcel, enabling efficient amalgamation. → Counter: The school site is also a single parcel, similarly adjacent to delivery-accessible roads.')),
  boxLine(BLK('(b) School site: Reserved for educational use, not available for commercial development. → Counter: Karem\'s residential home is surely more important to protect than a "reserved" (but vacant) school site.')),
  boxLine(BLK('(c) Planning considerations: URA/LTA assessed the grass patch location as optimal. → Karem should seek disclosure of the planning advice (Robin Per v HDB — duty to disclose adverse report in appropriate cases). Without justification, the designation remains suspect.')),
  boxLine(BLK('(d) Key evaluative point: The designation was made knowing it would necessitate acquisition of Karem\'s home. The Ministerial exercise of discretion may constitute an IMPROPER PURPOSE if the real intent was not delivery efficiency but to facilitate a commercial development (sale to highest bidder).')),
]),

H2('F.  Art 12(1) and Validity — Land Acquisition Notice'),
H3('Selective Acquisition — Art 12 Challenge'),
p(BLK('Karem\'s neighbours on the OTHER side of the field were NOT served acquisition notices. This is the strongest Art 12 claim:')),
pi(BLK('Under '),ITA('Eng Foong Ho v AG',{color:'1F4E79'}),BLK(': "An executive act may be unconstitutional if it amounts to intentional and arbitrary discrimination." The Collector must justify why only Karem\'s property was acquired and not the equally adjacent neighbours\' properties.')),
pi(BLK('Under '),ITA('Syed Suhail',{color:'1F4E79'}),BLK(': Karem and his neighbours are '),BLD('equally situated'),BLK(' — both properties abut the grass patch. Differential treatment (only Karem receives an acquisition notice) shifts the evidential burden to the Collector.')),
pi(BLK('The Collector\'s rejection of Karem\'s objection without giving reasons is procedurally suspect. Per '),ITA('Robin Per v HDB',{color:'1F4E79'}),BLK(', there is a general duty to disclose an adverse report to an affected party to enable a response. Failure to provide reasons for rejecting the objection may constitute a breach of procedural natural justice ('),ITA('Manjit Singh v AG',{color:'1F4E79'}),BLK(' — though no general duty to give reasons exists, the circumstances here — deprivation of one\'s home — warrant higher procedural standards).')),

H3('"Public Purpose" Challenge under LAA'),
p(BLK('Section 5 LAA authorises acquisition for a "public purpose." The Government plans to '),BLD('sell the amalgamated site to the highest bidder for private operation.'),BLK(' This raises the question whether private commercial operation of a drone parking facility constitutes a "public purpose."')),
pi(BLK('Per '),ITA('Teng Fuh Holdings v Collector of Land Revenue',{color:'1F4E79'}),BLK(': The notification under s 5(3) LAA is conclusive evidence that land is required for the stated purpose. Challenge on grounds of bad faith must be proven with a '),BLD('prima facie'),BLK(' case of reasonable suspicion of bad faith.')),
amberBox('EVALUATIVE — Is "public purpose" satisfied here?', [
  boxLabel('Borderline: Private operation vs public infrastructure', 'C55A11'),
  boxLine(BLK('Arguments FOR bad faith / improper purpose: (i) The amalgamated land is being SOLD (not retained for public use); (ii) the operator is a PRIVATE highest bidder; (iii) the commercial nature of the enterprise suggests the dominant purpose is NOT public welfare but private commercial gain. This distinguishes it from, e.g., transportation infrastructure held in public hands.')),
  boxLine(BLK('Arguments AGAINST: (i) Governments regularly use private operators for public infrastructure (PPP models); (ii) drone delivery networks serve the general public; (iii) courts are slow to second-guess executive assessment of "public purpose" — Teng Fuh Holdings requires bad faith, not mere commercial involvement.')),
  boxLine(BLK('Evaluative recommendation: Frame this as corroborating the improper purpose argument for the Ministerial designation, rather than as a standalone claim. The combination of: (1) private operator, (2) sale to highest bidder, (3) selective acquisition of only Karem\'s land, and (4) no reasons given for rejecting his objection, collectively supports a prima facie case of bad faith sufficient to trigger scrutiny.')),
]),

purpBox('★  STRATEGIC ADVICE (Purple) — Karem', [
  boxLabel('Recommended argument sequence and remedies', '7030A0'),
  boxLine(PRP_B('LEAD CLAIM:'),PRP(' Art 12(1) challenge to the acquisition notice — selective acquisition vs neighbours is the single strongest factual hook. Proves differential executive action; shifts burden to Collector to justify.')),
  boxLine(PRP_B('SECOND CLAIM:'),PRP(' Art 12(1) challenge to Ministerial designation — school site vs Karem\'s area. Apply Syed Suhail two-step. Combined with the "public purpose" issue, creates cumulative pressure.')),
  boxLine(PRP_B('THIRD CLAIM:'),PRP(' Constitutionality of EDA as legislation — make this argument but manage expectations; legislation is hardest to strike down under RCT. Run it to preserve the point on appeal.')),
  boxLine(PRP_B('DO NOT LEAD WITH:'),PRP(' Art 9 privacy claim — current jurisprudence is clear that privacy/property is outside Art 9. Raising it damages credibility. Mention briefly and distinguish YVK (2015) scope.')),
  boxLine(PRP_B('REMEDIES:'),
    PRP(' (1) Quashing order (certiorari) — quash the s 5 LAA acquisition notification as unlawful (improper purpose; Art 12 discrimination). ')),
  boxLineI(PRP('(2) Prohibiting order — prevent the Collector/Government from proceeding with the acquisition pending judicial review.')),
  boxLineI(PRP('(3) Declaratory order — declare the Ministerial designation of Karem\'s area as a drone zone was made in breach of Art 12(1) for failure to justify differential treatment.')),
  boxLineI(PRP('(4) Mandatory order — compel the Collector/Minister to provide reasons and reconsider the designation/acquisition taking into account Karem\'s neighbours\' unaffected status.')),
  boxLine(PRP_B('TACTICAL NOTE:'),PRP(' File for judicial review and simultaneously seek an interim injunction to halt the acquisition pending hearing. Under O 24 r 5, apply within 3 months of the acquisition notification. The acquisition notice is a concrete harm — this is not a case where time to file is ambiguous.')),
]),

// =========================================================================
PB(),
H1('AY2023–24 Q4 — Constitutional Interpretation'),
H2('Question'),
p(BLK('"In the exercise of its judicial power, the Singapore courts\' approaches to constitutional interpretation reflect its commitment to upholding the principles of constitutional supremacy and separation of powers." Critically discuss this statement by reference to the relevant case laws.')),
pinkBox('Examiner Feedback — Q4 (AY23-24)', [
  boxLabel('What examiners specifically required — A band scripts must address ALL THREE:', '9B1F6E'),
  boxLine(BLK('(1) The METHODS of constitutional interpretation used by Singapore courts — describe what they are and HOW they are operationalised in judicial decision-making')),
  boxLine(BLK('(2) The IMPLICATIONS of those methods for judicial power, constitutional supremacy, and separation of powers — including the LINKS among those three principles')),
  boxLine(BLK('(3) JUSTIFY analysis (1) and (2) by reference to specific case laws — NOT limited to fundamental liberties. Include Tan Cheng Bock, Vellama, Wong Souk Yee alongside rights cases.')),
  boxLine(RED('✗ Common failure: Scripts described jurisprudence on specific rights (Art 9, 12, 15) then concluded "narrow" or "deferential." This only covers part of the question. Must address the METHODS themselves, not just the outcomes.')),
  boxLine(RED('✗ Dropping concepts (SOP, supremacy) without explaining how the specific method strengthens or weakens those principles = insufficient.')),
]),
SP(),

H2('Thesis'),
p(BLK('Singapore courts\' approaches to constitutional interpretation '),BLD('partially'),BLK(' reflect a commitment to constitutional supremacy and separation of powers — but the relationship is neither consistent nor complete. The commitment is genuine at the level of principle and in structural constitutional cases, but is frequently attenuated in fundamental liberties jurisprudence, where SOP-based deference to the legislature undermines the full protective force of Art 4\'s supremacy clause. The net result is a constitutional jurisprudence in productive tension: the methods employed guard against judicial overreach (serving SOP) while sometimes leaving the Constitution under-enforced as supreme law.')),

H2('I.  The Methods of Constitutional Interpretation Used by Singapore Courts'),
H3('(A) Purposive Interpretation — The Dominant Method'),
p(BLK('Affirmed in '),ITA('Tan Cheng Bock v AG',{color:'1F4E79'}),BLK(' [2017], purposive interpretation requires the court to give effect to the intent and will of Parliament. Section 9A of the Interpretation Act (applied to the Constitution via Art 2(9)) mandates an interpretation that promotes the purpose or object underlying the written law. The TCB framework operationalises purposive interpretation in three steps: (i) ascertain all possible interpretations from the text; (ii) identify legislative purpose from intrinsic and extrinsic materials; (iii) prefer the interpretation that furthers that purpose.')),
pi(BLK('In '),ITA('Vellama d/o Marie Muthu v AG',{color:'1F4E79'}),BLK(' [2013], the court applied purposive interpretation to Art 49 (by-elections) and held that the Prime Minister has a constitutional duty to call a by-election — the general constitutional purpose of ensuring democratic representation prevailed over the narrower textual reading favouring absolute executive discretion.')),
pi(BLK('In '),ITA('Tan Cheng Bock',{color:'1F4E79'}),BLK(' itself, the court gave primacy to the specific purpose of Art 19B (preventing any one racial community from monopolising the presidency indefinitely), over the general purpose of reserved elections — demonstrating that purposive interpretation is not mechanical but involves layered purposive analysis.')),

H3('(B) Sui Generis / Generous Interpretation'),
p(BLK('Constitutional provisions call for "principles of interpretation of their own, suitable to [their] character … without necessary acceptance of all the presumptions that are relevant to legislation of private law" ('),ITA('Taw Cheng Kong v PP',{color:'1F4E79'}),BLK(', affirming '),ITA('Minister of Home Affairs v Fisher',{color:'1F4E79'}),BLK(').')),
pi(BLK('In '),ITA('Ong Ah Chuan v PP',{color:'1F4E79'}),BLK(' [1981] (PC), the Privy Council held that Part IV liberties should receive a generous interpretation to avoid "the austerity of tabulated legalism" and to give individuals the full measure of the fundamental liberties referred to.')),
pi(BLK('The sui generis approach formally signals constitutional supremacy — the Constitution is treated as qualitatively different from, and hierarchically superior to, ordinary legislation. But as discussed below, subsequent Singapore courts have frequently departed from the "generous interpretation" mandate in practice.')),

H3('(C) Four Walls Approach'),
p(BLK('Singapore courts interpret the Constitution primarily "within its own four walls and not in light of analogies drawn from other countries such as Great Britain, the USA or Australia" ('),ITA('Colin Chan v PP',{color:'1F4E79'}),BLK(').')),
pi(BLK('In '),ITA('Chee Siok Chin v MHA',{color:'1F4E79'}),BLK(': "Different countries have differing thresholds for what is perceived as acceptable public conduct … The court will not only be guided but indeed be bound by the manifest intent and purport of both the Constitution and domestic legislation." Proportionality (a continental/ECHR concept) was explicitly rejected.')),
pi(BLK('In '),ITA('Lim Meng Suang v AG',{color:'1F4E79'}),BLK(': Foreign cases carry "no weight" given Singapore\'s unique context.')),

H3('(D) Historical / Originalist Elements'),
p(BLK('In '),ITA('Yong Vui Kong v PP',{color:'1F4E79'}),BLK(' [2010] (MDP), the CA reasoned from the history of the constitutional text — specifically the Wee Commission\'s deliberate rejection of an express prohibition against inhuman punishment — to preclude reading such a prohibition into Art 9(1). The constitutional framers\' choice is treated as determinative.')),
pi(BLK('The same approach in '),ITA('Tan Seng Kee',{color:'1F4E79'}),BLK(' [2022]: The restrictive reading of Art 9(1) "is supported by the text, structure and history of the provision" — derived partly from Art 21 of the Indian Constitution, which consciously rejected the wider US due process formulation.')),

H3('(E) Strict Textualism (Selective)'),
p(BLK('In '),ITA('Rajeevan Edakalavan v PP',{color:'1F4E79'}),BLK(': Art 9(3) is a negative right. "Shall be allowed" imposes no positive duty to inform of the right to counsel. The court declined to read in an ancillary right to notification because this "will be tantamount to judicial legislation." Strict textualism employed to confine the right.')),

H2('II.  Implications for Constitutional Supremacy'),
H3('Constitutional Supremacy — What It Requires'),
p(BLK('Article 4 declares the Constitution the "supreme law" of Singapore. Any inconsistent law is void to the extent of the inconsistency. Constitutional supremacy demands that courts give the Constitution real operative force against legislative and executive overreach. As the court affirmed in '),ITA('Taw Cheng Kong v PP',{color:'1F4E79'}),BLK(': "Constitutional rights are enjoyed because they are constitutional in nature … inalienable." If courts interpret the Constitution too narrowly, they abrogate their Art 4 role as the guardians of supreme law.')),

H3('Where Methods Support Constitutional Supremacy'),
pi(BLK('Purposive interpretation ('),ITA('Vellama, TCB',{color:'1F4E79'}),BLK('): By giving constitutional provisions real protective force against executive discretion, purposive interpretation upholds Art 4. In Vellama, the court refused to let the PM reduce a constitutional duty to a matter of absolute discretion — thereby vindicating constitutional supremacy.')),
pi(BLK('Sui generis / generous interpretation ('),ITA('Ong Ah Chuan',{color:'1F4E79'}),BLK('): The injunction to give fundamental liberties a "generous interpretation" is itself a statement of constitutional supremacy — the Constitution stands above Parliament and must be given its full protective effect.')),
pi(BLK('Basic structure recognition ('),ITA('Mohammad Faizal bin Sabtu v PP',{color:'1F4E79'}),BLK('): The court held that the separation of powers is part of Singapore\'s constitutional structure, and Parliament may not enact laws inconsistent with this principle. This is the court acting as the active guardian of constitutional supremacy.')),

H3('Where Methods Attenuate Constitutional Supremacy'),
amberBox('Critical Evaluation — When SOP reasoning DILUTES constitutional supremacy', [
  boxLabel('The key tension in the question', 'C55A11'),
  boxLine(BLK('The courts frequently invoke SOP/anti-judicial-legislation reasoning to LIMIT the protective scope of constitutional rights, which paradoxically weakens constitutional supremacy:')),
  boxLine(BLK('• LMS: RCT as the sole test for Art 12(1) — courts refuse to inquire into legitimacy of legislative purpose (would make courts "mini-legislatures"). But this risks rendering Art 12(1) an "empty container" (per Menon CJ in TSK). If Parliament can always formulate a formally non-arbitrary purpose, Art 12 provides only minimal protection.')),
  boxLine(BLK('• YVK (2010): Freezing FRNJ at 1963 means "in accordance with law" cannot evolve with changing standards of justice. Constitutional protection is capped at its historical minimum — problematic for a supreme law that is meant to endure and adapt.')),
  boxLine(BLK('• ISA amendments (Teo Soh Lung): Parliament legislatively overruled Chng Suan Tze by amending Art 149(3) and ISA s 8B to restore the subjective standard of review. The court upheld this. The implication: in national security contexts, parliamentary supremacy effectively overrides the courts\' constitutional interpretation — an "impure" form of constitutional supremacy where the supreme document is itself vulnerable to legislative erosion within Art 149\'s domain.')),
]),

H2('III.  Implications for Separation of Powers'),
H3('Three Conceptions of SOP in Singapore Jurisprudence'),
p(BLK('Academic analysis (Thio Li-ann, '),ITA('"Treatise"',{italics:true}),BLK(') identifies three conceptions of separation of powers operating across Singapore jurisprudence:')),
pi(BLD('(i) Autonomy model:'),BLK(' Each branch is supreme within its own domain. Courts should not intrude on legislative or executive choices. This tends to produce judicial deference.')),
pi(BLD('(ii) Deference model:'),BLK(' Courts recognize the superior institutional competence of other branches in certain domains (national security, economic policy, social policy) and defer accordingly.')),
pi(BLD('(iii) Control model:'),BLK(' Courts exercise active supervision to ensure each branch stays within its constitutional boundaries. This is the basis for judicial review under '),ITA('Chng Suan Tze',{color:'1F4E79'}),BLK('\'s rule that "all power has legal limits."')),

H3('How the Methods Operationalise Different SOP Conceptions'),
pi(BLK(''),BLD('Purposive interpretation + Control model:'),BLK(' In '),ITA('Vellama',{color:'1F4E79'}),BLK(', purposive interpretation was used to hold the PM to a constitutional duty — exemplifying the control model. The court actively supervises executive discretion, ensuring it remains within the limits of Art 49.')),
pi(BLD('Four walls + Autonomy model:'),BLK(' Refusing to import ECHR/US proportionality principles ('),ITA('Chee Siok Chin',{color:'1F4E79'}),BLK(') preserves the autonomy of Singapore\'s constitutional order. Courts determine meaning domestically without external judicial interference.')),
pi(BLD('Textualism/originalism + Deference model:'),BLK(' In '),ITA('Rajeevan',{color:'1F4E79'}),BLK(' and '),ITA('YVK (2010)',{color:'1F4E79'}),BLK(', narrow reading + historical analysis leads to deference — courts confine themselves to what the text + history reveals, deferring to Parliament on expansions.')),
pi(BLD('TSK obiter (s 377A):'),BLK(' Court observed "there is no presumption that every differentiating measure enacted by Parliament bears a rational relation to the object sought to be achieved" — a shift towards the '),BLD('control model'),BLK(' for Art 12, rejecting the presumption of constitutionality as a strong operating principle. This is a significant jurisprudential development towards greater constitutional supremacy.')),

H3('Wong Souk Yee v AG — Where SOP and Supremacy Converge'),
p(BLK('In '),ITA('Wong Souk Yee v AG',{color:'1F4E79'}),BLK(', the court engaged in purposive interpretation to hold that no by-election is required when a single seat in a GRC falls vacant. The court used the background of the GRC scheme (parliamentary intent: preventing one MP from holding others "to ransom") to interpret Art 49(1)\'s reference to "seat of a Member" as limited to SMC seats. The court simultaneously respected SOP (Parliament\'s design of the GRC system) while upholding constitutional supremacy (giving the Constitution a coherent, workable meaning). This illustrates that at its best, the courts\' methods can serve both commitments at once.')),

H2('IV.  Evaluation'),
p(BLK('The statement is '),BLD('partially correct.'),BLK(' Singapore courts demonstrate a genuine formal commitment to constitutional supremacy (Art 4) and separation of powers — the methods of interpretation are sophisticated, domestically grounded, and appropriately resist judicial legislation. At the level of structural constitutional provisions ('),ITA('Vellama, TCB, Wong Souk Yee',{color:'1F4E79'}),BLK('), the courts perform their constitutional role admirably, using purposive interpretation to hold all branches to account.')),
p(BLK('However, in the domain of fundamental liberties, the courts\' reflexive reliance on the "mini-legislature" concern and deference to Parliament has produced a body of law that inadequately vindicates the "supreme law" mandate of Art 4. The result is a constitutional order where: (a) legislation almost never fails the Art 12 RCT; (b) "in accordance with law" under Art 9 is frozen at 1963 standards; and (c) Parliament can override the courts\' own constitutional interpretations in national security contexts. These outcomes are not mere applications of SOP — they reflect a structural tilt that, as the ISA amendments demonstrate, can allow parliamentary supremacy to eclipse constitutional supremacy when the two come into conflict.')),
p(BLK('The evolution towards greater scrutiny — in '),ITA('TSK',{color:'1F4E79'}),BLK(' on Art 12 and in '),ITA('YVK (2015)',{color:'1F4E79'}),BLK(' on bodily integrity under Art 9 — suggests courts are aware of this tension and moving (albeit cautiously) towards a stronger constitutional supremacy commitment. Whether this represents a sustainable jurisprudential shift or a doctrinal anomaly remains to be seen.')),

// =========================================================================
PB(),
H1('AY2023–24 Q5 — Article 14 and Three Categories of Speech'),
H2('Question'),
p(BLK('"Those who spread lies, attack the courts, and besmirch the reputation of politicians do not enjoy the protection of Article 14." Critically discuss this statement.')),
pinkBox('Examiner Feedback — Q5 (AY23-24)', [
  boxLabel('What examiners required', '9B1F6E'),
  boxLine(BLK('✓ A THESIS STATEMENT taking a position on the quotation')),
  boxLine(BLK('✓ ALL THREE categories: (1) false speech/POFMA + TOC v AG [2021] SGCA 96; (2) contempt of court + AJPA + Jolovan Wham [2020] SGCA 16; (3) defamation of politicians')),
  boxLine(RED('✗ Omitting contempt of court = automatically incomplete answer')),
  boxLine(RED('✗ Repeating study notes without using the content to answer the QUOTE directly')),
  boxLine(BLK('✓ Need to assess whether Art 14(1) IS enjoyed, but subject to Art 14(2) limitations, in each scenario')),
]),
SP(),

H2('Thesis'),
p(BLK('The statement is '),BLD('partly correct, but significantly overbroad'),BLK('. Article 14 does not offer blanket protection to deliberate falsehoods, genuinely contemptuous speech, or actionable defamation. However, the statement errs in presenting these as monolithic categories that automatically fall outside constitutional protection. The correct position is that Art 14(1) '),BLD('prima facie'),BLK(' protects all these categories of speech; Art 14(2)(a) empowers Parliament to restrict them through legislation; and the constitutional validity of such restrictions must satisfy the '),ITA('Jolovan Wham',{color:'1F4E79'}),BLK(' framework — not merely be asserted as categorical exclusions from Art 14 entirely. The statement confuses the '),BLD('existence of limits'),BLK(' with the '),BLD('total absence of protection'),BLK('.')),

H2('I.  Framework: Art 14(1) and Art 14(2)'),
p(BLK('Article 14(1)(a) guarantees every citizen the right to freedom of speech and expression. This right is not absolute — Art 14(2)(a) permits Parliament to restrict free speech by law in the interest of security of Singapore, friendly relations with other countries, public order, or morality, and to restrict speech constituting contempt of court, defamation, or incitement to any offence.')),
p(BLK('The constitutional framework for assessing whether a restriction is valid was set out in '),ITA('Jolovan Wham Kwok Han v AG',{color:'1F4E79'}),BLK(' [2020] SGCA 16:')),
pi(BLK('Step 1: Does the legislation restrict the constitutional right?')),
pi(BLK('Step 2: Did Parliament consider the restriction "necessary or expedient"?')),
pi(BLK('Step 3: Does the restriction, objectively, fall within the relevant permitted purpose under Art 14(2)?')),
p(BLK('Critically: this framework requires a '),BLD('nexus'),BLK(' between the restriction and a permitted Art 14(2) purpose. The restriction must be proportionate enough to satisfy this nexus. The statement\'s blanket assertion that these speakers "do not enjoy the protection of Art 14" inverts this framework — it treats Art 14(2) limitations as definitional exclusions rather than as restrictions on an existing right.')),

H2('II.  "Spread Lies" — POFMA and False Speech'),
H3('Does Art 14 Protect False Speech?'),
p(BLK('In '),ITA('Ting Choon Meng v AG',{color:'1F4E79'}),BLK(': "False speech cannot be justified as free speech" — Art 14 refers to the communication of information, not misinformation. The House of Lords in '),ITA('Reynolds v Times Newspapers',{color:'1F4E79'}),BLK(' similarly observed there is no human right to misinformation.')),
p(BLK('In '),ITA('The Online Citizen Pte Ltd v AG and another appeal',{color:'1F4E79'}),BLK(' [2021] SGCA 96 ("TOC v AG"): The SGCA upheld POFMA\'s Correction Directions (CDs) as constitutionally valid. Correction orders merely require the subject to '),BLD('accompany'),BLK(' the original statement with a correction notice — they do not prevent the original statement from remaining online. This does not violate Art 14(1) because the original speech is preserved; the speaker can also indicate they are challenging the correction.')),

H3('Stop Communication Directions (SCDs) — The More Serious Restriction'),
amberBox('EVALUATIVE — SCDs vs CDs: A significant constitutional distinction', [
  boxLabel('The key borderline issue in POFMA constitutionality', 'C55A11'),
  boxLine(BLK('The 2025 exam paper (Qn 5) goes deeper into SCDs. A CD merely requires a correction notice alongside the original statement — the CA in TOC upheld this as not restricting speech per se. An SCD, however, requires the person to TAKE DOWN the statement entirely, preventing its continued existence.')),
  boxLine(BLK('Key arguments against SCD constitutionality: (i) Unlike a CD, an SCD entirely prevents the statement-maker from "speaking" — it goes beyond compelled speech to enforced silence; (ii) Once the original statement is removed, the correction notice compelled by the SCD arguably constitutes compelled speech without the accompanying original (no ability to qualify); (iii) The statement-maker is entirely restricted from speaking, which may tip the balance against constitutionality at the final balancing stage of the Jolovan Wham framework.')),
  boxLine(BLK('The net result: Art 14 provides QUALIFIED protection against false speech — CDs are likely constitutional; the constitutionality of SCDs remains more contested. The statement that liars "do not enjoy the protection of Art 14" is thus an overstatement: they enjoy protection that can be lawfully regulated, but not extinguished entirely without constitutional scrutiny.')),
]),

H2('III.  "Attack the Courts" — Contempt of Court'),
H3('AJPA and the "Real Risk" Test'),
p(BLK('The Administration of Justice (Protection) Act 2016 (AJPA) codifies the law of contempt. The key test is found in '),ITA('Jolovan Wham Kwok Han v AG',{color:'1F4E79'}),BLK(' [2020] SGCA 16, which affirmed the '),BLD('"real risk"'),BLK(' test under s 3(1)(a) AJPA: whether there is a real risk that the course of justice would be interfered with or undermined. This test is deliberately '),BLD('higher'),BLK(' than the previous "inherent tendency" test — it provides '),BLD('more protection'),BLK(' for speech, not less.')),
p(BLK('Crucially: Section 3(2) AJPA and Explanation 1 expressly preserve the right to '),BLD('"fair criticism"'),BLK(' of judicial decisions. This is a built-in Art 14 protection within the contempt regime itself.')),
H3('Statements of Principle'),
pi(ITA('Attorney-General v Shadrake Alan',{color:'1F4E79'}),BLK(': "Justice is not a cloistered virtue … open to criticism." The law of contempt must "strike an adequate balance between the freedom of speech and the countervailing constitutional interest."')),
pi(ITA('Attorney-General v Tan Liang Joo John',{color:'1F4E79'}),BLK(': Temperate, balanced criticism of courts is protected. Criticism must be evaluated contextually — intention to vilify is "easily inferred where outrageous and abusive language is used" but not presumed.')),
pi(ITA('Jolovan Wham',{color:'1F4E79'}),BLK(': Wham\'s Facebook post (characterising a court judgment as politically motivated) was found to be in contempt — but the court was careful to identify the '),BLD('specific risk posed to the administration of justice'),BLK(', not merely the offensive content of the statement.')),
amberBox('EVALUATIVE — "Attack the courts" does not automatically = contempt', [
  boxLabel('Borderline: When does criticism become contempt?', 'C55A11'),
  boxLine(BLK('The statement in the question implies that ANY attack on courts falls outside Art 14. This is wrong. The AJPA regime itself recognises fair criticism as protected. The key distinction is:')),
  boxLine(BLK('• Protected: Reasoned critique of judicial reasoning; academic commentary; journalistic analysis of legal decisions; advocacy for law reform based on criticism of court outcomes')),
  boxLine(BLK('• Unprotected: Imputing improper motives to judges without factual basis; publications that create a real (not merely speculative) risk of undermining confidence in the administration of justice')),
  boxLine(BLK('The "real risk" test is itself evidence that the Constitution\'s Art 14 protection is being taken seriously — Parliament must demonstrate actual risk of harm, not merely offensive content.')),
]),

H2('IV.  "Besmirch the Reputation of Politicians" — Defamation'),
H3('The Common Law of Defamation'),
p(BLK('Art 14(2)(a) expressly lists "defamation" as a permitted restriction. Singapore courts have developed a robust defamation regime with particular application to political figures.')),
pi(ITA('Lee Hsien Loong v Roy Ngerng Yi Ling',{color:'1F4E79'}),BLK(': Defamatory statements on a blog imputing dishonesty to the PM — damages awarded. Court acknowledged the philosophical justifications for free speech (truth, democracy, self-realisation) but held these did not justify the publication of statements known to be false.')),
pi(ITA('Review Publishing Co Ltd v Lee Hsien Loong',{color:'1F4E79'}),BLK(': The Reynolds privilege (media qualified privilege for publication in the public interest) was '),BLD('rejected'),BLK(' in Singapore. "Singapore\'s political culture … seeks to maintain a high standard of truth and honesty in politics." The media has no special role beyond "reporting the news and giving its views on matters of public interest fairly and accurately."')),
pi(BLK('Absence of the American public figure doctrine ('),ITA('New York Times v Sullivan',{color:'1F4E79'}),BLK(', "actual malice" standard): Singapore has not adopted this. Political figures enjoy the same defamation protection as private individuals, arguably more so given the courts\' communitarian view of political leadership reputation.')),
H3('Defences Preserve Some Art 14 Protection'),
p(BLK('The statement\'s assertion that those who "besmirch politicians" fall outside Art 14 is an overstatement:')),
pi(BLD('Justification (truth):'),BLK(' Truthful criticism of politicians is fully protected. The statement presupposes that all such speech is defamatory — but truth is a complete defence. Political accountability discourse, if accurate, attracts no defamation liability.')),
pi(BLD('Fair comment:'),BLK(' Comment based on true facts on a matter of public interest is protected — political conduct is quintessentially such a matter.')),
pi(BLD('Qualified privilege:'),BLK(' The CA in '),ITA('Review Publishing',{color:'1F4E79'}),BLK(' left open the question of whether, over time, a Reynolds-type defence might be recognised — given the growth of internet journalism since 2009. This remains a live academic and practitioner debate.')),
amberBox('EVALUATIVE — Should Singapore adopt a public figure doctrine?', [
  boxLabel('Alternative position: Academic critique of current approach', 'C55A11'),
  boxLine(BLK('The lack of a public figure doctrine in Singapore means that politicians who engage in public controversies enjoy the same (or greater) protection against criticism as private individuals. This creates a chilling effect on political commentary. Mill\'s harm principle suggests that public figures who voluntarily enter political life must accept greater scrutiny. Stronger free speech arguments (truth-finding, democratic accountability) support a reduced threshold for actionable defamation when the subject is a political figure exercising public power.')),
  boxLine(BLK('Counter: Singapore\'s communitarian values (Shared Values White Paper 1991) prioritise political leaders\' ability to govern with moral authority. If leaders cannot vindicate their reputation, the public\'s trust in institutions is eroded. This is a coherent, if contested, constitutional value. The court in Review Publishing invoked this rationale. The alternative position is normatively attractive but unlikely to prevail in current Singapore courts.')),
]),

H2('V.  Synthesis and Evaluation'),
p(BLK('The statement captures a legal reality: Art 14 is not a shield for deliberate falsehoods, contemptuous speech that genuinely risks interfering with the administration of justice, or actionable defamation. But it fundamentally mischaracterises the constitutional architecture:')),
pi(BLK('(1) Art 14(1) '),BLD('prima facie'),BLK(' protects ALL speech, including the three categories. The restrictions come through Art 14(2) — they are '),BLD('limitations on a right'),BLK(', not definitional exclusions from its scope.')),
pi(BLK('(2) Each restriction must satisfy the '),ITA('Jolovan Wham',{color:'1F4E79'}),BLK(' tripartite framework. Not all restrictions pass: SCDs under POFMA face more constitutional scrutiny than CDs; the contempt '),BLD('"real risk"'),BLK(' test expressly preserves fair criticism; defamation law retains truth and fair comment defences.')),
pi(BLK('(3) The proper formulation is: Those who '),BLD('deliberately'),BLK(' spread falsehoods, '),BLD('genuinely'),BLK(' undermine the administration of justice, and publish '),BLD('unjustified'),BLK(' defamatory statements have limited Art 14 protection in those specific respects — but retain full Art 14 protection for truthful speech, fair criticism, and responsible political commentary. The statement\'s sweeping exclusion distorts the constitutional position.')),
purpBox('★  STRATEGIC NOTE (Purple) — Exam Technique for Q5', [
  boxLabel('To maximise marks on this type of question', '7030A0'),
  boxLine(PRP('This question rewards candidates who address the QUOTE directly, not just the substantive law. Open with a clear thesis accepting the statement is "partly correct but significantly overbroad." Then structure the answer around whether Art 14 EXCLUDES or REGULATES each category — this directly engages the wording "do not enjoy the protection of Article 14."')),
  boxLine(PRP('For full marks: After describing each regime (POFMA/contempt/defamation), explicitly state whether the relevant speech is: (a) UNPROTECTED by Art 14 — as the quote suggests; (b) PROTECTED by Art 14 but subject to valid limitation; or (c) PROTECTED by Art 14 with the restriction being of contested constitutionality. Categories (b) and (c) contradict the quote — this is the critical analysis.')),
  boxLine(PRP('Do NOT omit AJPA/Jolovan Wham — examiners in AY23-24 specifically flagged this as causing automatic incompleteness.')),
]),

// =========================================================================
PB(),
H1('AY2024–25  SECTION B'),
H2(''),
p(BLD('AY2024–25 Examiners\' General Note:'),BLK(' Q4 on Art 9 was fairly well done; students focused on Art 9(1) and 9(3). Good essays evaluated the courts\' positions in line with a clearly articulated theory of constitutional interpretation. Q3 was attempted by very few students and most responses were "abysmal." The examiner noted only ONE student understood the question involved judicial independence and Art 12 — which should be the focus of the analysis.')),
SP(),

// =========================================================================
PB(),
H1('AY2024–25 Q3 — ARA\'s Challenge (Judicial Independence + Art 95)'),
H2('Question'),
p(BLK('The PM makes a parliamentary statement that he will not recommend Supreme Court judges who have not completed full-time national service. ARA challenges this. The President appoints 68-year-old Simon Yayamukar (retired Chief of Army, LLB, University of Singapore) as a Supreme Court Judge for 1 year. The President then exercises Art 95(5)(a) to appoint Yayamukar to hear ARA\'s challenge. What arguments will you raise on behalf of ARA?')),
pinkBox('Examiner Feedback — Q3 (AY24-25)', [
  boxLabel('Critical feedback — vast majority missed the point', '9B1F6E'),
  boxLine(BLK('The gist of this question: JUDICIAL INDEPENDENCE and ART 12.')),
  boxLine(BLK('Only one student understood this. ARA\'s arguments must address: (1) whether the PM\'s policy is constitutionally valid; (2) whether Yayamukar\'s appointment as a judge is valid; (3) whether appointing Yayamukar under Art 95(5)(a) to hear THIS SPECIFIC CASE creates judicial independence/bias concerns.')),
  boxLine(RED('✗ Merely arguing the policy is "unfair" or invoking judicial independence in the abstract without anchoring it in specific constitutional provisions (Art 95, Art 93, Art 12) will score poorly.')),
]),
SP(),

H2('A.  Locus Standi of ARA'),
p(BLK('ARA is a civil society group. Under '),ITA('Kenneth Jeyaretnam v AG',{color:'1F4E79'}),BLK(', standing requires: (i) public duty breached; (ii) generating correlative private/public rights, OR a breach of sufficient gravity in the public interest. Judicial independence is a fundamental constitutional principle underpinning Art 93 and the entire legal order. Its breach affects ALL citizens\' right to an independent judiciary.')),
p(BLK('ARA can invoke '),BLD('public interest standing'),BLK(' per '),ITA('Vellama v AG',{color:'1F4E79'}),BLK(': where a public constitutional duty is breached and the breach is of sufficient gravity, the court exercises discretion to grant standing to a public interest challenger. The integrity of judicial appointments and judicial independence is quintessentially a matter of sufficient gravity and public constitutional importance.')),
amberBox('EVALUATIVE — Will ARA\'s standing be accepted?', [
  boxLabel('Borderline: Organisational standing in Singapore', 'C55A11'),
  boxLine(BLK('Singapore courts have been cautious about granting organisational standing (cf. locus standi in Tan Eng Hong requiring personal right violation). ARA\'s members presumably include individuals who would be subject to judicial decisions — they are all affected by whether the judiciary is independent. The best argument is that the rule of law itself is a constitutional norm (Mohammad Faizal) and any Singaporean citizen — including ARA\'s members — has an interest in it being upheld. Alternatively, ARA should identify individual members who are lawyers, rights advocates, or who are otherwise directly affected by the composition of the judiciary.')),
]),

H2('B.  Challenge to the PM\'s Policy — Is it Lawful?'),
H3('The Policy: No recommendation for SC judges who have not completed full-time NS'),
H4('(i) Art 95(1) — Scope of PM\'s Appointment Power'),
p(BLK('Under Art 95(1), the Chief Justice and judges of the Supreme Court are appointed by the President, acting on the advice of the Prime Minister (who must consult the Chief Justice). The PM thus has a constitutional role in advising on judicial appointments — this power is legitimate in form.')),
p(BLK('However, the power to '),BLD('advise'),BLK(' is not unlimited. Under the '),ITA('Padfield',{color:'1F4E79'}),BLK(' principle (endorsed in Singapore in '),ITA('Tan Seet Eng',{color:'1F4E79'}),BLK('), a statutory discretion must be exercised consistently with the purpose of the power-conferring provision and must not be used to promote a purpose beyond or contrary to the legislation\'s object. Art 95 confers the appointment power for the purpose of constituting an independent, qualified judiciary. Using the advisory power to impose a blanket NS requirement potentially defeats this purpose by:')),
pi(BLK('(a) Restricting the pool of qualified candidates to those who have completed NS — effectively an additional qualification criterion not found in Art 95 or the Supreme Court of Judicature Act (SCJA);')),
pi(BLK('(b) Subordinating judicial qualifications (legal training, experience, competence) to a military/executive selection criterion — crossing the line between legitimate policy preference and interference with the independence of the judiciary.')),

H4('(ii) Unwritten Principle of Judicial Independence'),
p(BLK('Judicial independence is a fundamental unwritten constitutional principle in Singapore (Thio Li-ann; Chan Sek Keong CJ, '),ITA('"Securing and Maintaining the Independence of the Court in Judicial Proceedings"',{italics:true}),BLK(' (2010)). The judiciary must be insulated from executive influence in the exercise of its judicial power under Art 93.')),
p(BLK('If the PM can effectively condition judicial appointments on completion of a government-mandated military service, this gives the executive structural influence over the composition of the judiciary. Those who '),BLD('comply with state demands'),BLK(' (NS completion) are rewarded with eligibility for judicial appointment; those who cannot (e.g., permanent residents who were not eligible for NS, women (who are not conscripted), or individuals with medical exemptions) are categorically excluded. This structurally biases the judiciary in favour of persons with a demonstrated record of submission to executive authority.')),

H4('(iii) Art 12(1) — The Key Constitutional Challenge'),
p(BLK('The examiner\'s hint is that ARA\'s Art 12 argument is critical. The PM\'s policy creates a classification among potential judicial appointees: NS-completers vs non-completers. Apply the '),ITA('Syed Suhail',{color:'1F4E79'}),BLK(' two-step test (executive action):')),
pi(BLD('Step 1:'),BLK(' Are NS-completers and non-NS-completers "equally situated" as potential judicial candidates? Yes — they may possess identical legal qualifications, experience, and competence. The '),BLD('only'),BLK(' difference is NS completion, a criterion unrelated to judicial qualification.')),
pi(BLD('Step 2:'),BLK(' Is the differential treatment reasonable? The PM must show the NS-completion requirement bears a '),BLD('sufficient rational relation'),BLK(' to the purpose of judicial appointments under Art 95 (constituting an independent, competent judiciary). The nexus is '),BLD('tenuous'),BLK(':')),
pii(BLK('National security argument: The PM argued "national security" justifies the policy. But the connection between a judge\'s NS completion and their judicial competence or independence is indirect at best. Under Syed Suhail, where the decision affects life and liberty (here, the constitutional right to an independent judiciary), '),BLD('"searching scrutiny"'),BLK(' applies.')),
pii(BLK('Note the contrast with ordinary executive action: The PM\'s statement in Parliament transforms personal advisory practice into a formal policy that is likely justiciable as executive action with Art 12 implications.')),
amberBox('EVALUATIVE — Will the Art 12 challenge succeed?', [
  boxLabel('Arguments for and against', 'C55A11'),
  boxLine(BLK('FOR: (i) NS completion is unrelated to judicial qualification; (ii) where life and liberty are at stake (and all judicial decisions potentially affect these), "searching scrutiny" applies; (iii) the policy excludes women (not conscripted), PR, and medically exempted persons categorically — broadening the discriminatory impact.')),
  boxLine(BLK('AGAINST: (i) Courts traditionally give high deference to the PM\'s advisory role in judicial appointments (Thio — no perfect appointment process; even politically neutral bodies face difficulties); (ii) "National security" as a legitimate governmental purpose may pass the rational nexus test even if imperfect; (iii) The PM is not making a legal "decision" — a parliamentary statement may not be reviewable as an exercise of public power.')),
  boxLine(BLK('Evaluative recommendation: The better argument focuses on the STRUCTURAL effect — not whether a specific appointment was improper, but whether a blanket policy of this nature violates judicial independence as an unwritten constitutional norm. This engages Art 93, not just Art 12. The art of this question is combining both grounds.')),
]),

H2('C.  Challenge to Yayamukar\'s Appointment as Supreme Court Judge'),
H3('(i) Qualifications — Ultra Vires Art 95?'),
p(BLK('Under the Supreme Court of Judicature Act, a person is qualified to be a Supreme Court Judge if they have been an '),BLD('advocate'),BLK(' (i.e., a qualified legal practitioner admitted to the Singapore Bar) for at least 10 years. Yayamukar has an LLB from the University of Singapore but his career was as '),BLD('Chief of Army'),BLK(' — not as an advocate/solicitor.')),
p(BLK('If Yayamukar was never called to the Bar or has not practised as an advocate for 10 years, he is '),BLD('not qualified to be a Supreme Court Judge'),BLK('. The President\'s appointment of Yayamukar would then be '),BLD('ultra vires Art 95'),BLK(' — the President acts on PM advice, but advisory power cannot extend to recommending persons who are constitutionally unqualified. This is a '),BLD('precedent fact / jurisdictional error'),BLK(': whether Yayamukar possesses the requisite qualification is an objective fact that the court can verify ('),ITA('Khawaja',{color:'1F4E79'}),BLK(').')),

H3('(ii) Age — Art 98(1) Conflict'),
p(BLK('Art 98(1) provides that a judge of the Supreme Court shall hold office until the age of 65. Yayamukar is 68. He '),BLD('cannot be appointed as a substantive Supreme Court Judge.'),BLK(''))),
p(BLK('Art 95(4) allows the President to appoint a person as a '),BLD('Judicial Commissioner'),BLK(' "for such period or periods as the President thinks fit." This could authorise the 1-year appointment — but only as a Judicial Commissioner, not a full Judge. The 1-year appointment for a person aged 68 potentially relies on Art 95(4)/(5) rather than Art 95(1). If the appointment mischaracterises Yayamukar\'s status (as "Judge" rather than "Judicial Commissioner"), it may be technically defective.')),

H3('(iii) Short-Term Appointment — Judicial Independence Concerns'),
p(BLK('Art 95(4) appointments for specified periods have long attracted academic scrutiny as a threat to judicial independence (Hor, '),ITA('"The Independence of the Criminal Justice System in Singapore"',{italics:true}),BLK('). A judge appointed for '),BLD('1 year'),BLK(' may be inclined to seek renewal or other benefits from the executive — precisely the type of dependency that the security of tenure principle in Art 98(1) is designed to prevent.')),
p(BLK('Chan Sek Keong CJ countered that the Chief Justice has the final say on judicial postings and that decisions are open to public scrutiny, making illegitimate motivation unlikely. But where the appointee is specifically designated to hear a case challenging the '),BLD('very policy'),BLK(' of the Prime Minister who recommended the appointment, this counterargument loses force.')),

H2('D.  Challenge to the Art 95(5)(a) Designation — The Strongest Argument'),
H3('Art 95(5)(a) — Power to Appoint for a Specific Case'),
p(BLK('Art 95(5)(a) allows the President to appoint any person to "hear and determine a specified case only." This power was exercised to designate Yayamukar to hear ARA\'s challenge — the case directly attacking the PM\'s NS appointment policy.')),
H3('Apparent Bias — Reasonable Suspicion Test'),
p(BLK('The test for apparent bias is: whether '),BLD('"there are circumstances which would give rise to a reasonable suspicion or apprehension in a fair-minded reasonable person with knowledge of the relevant facts that the decision-maker was biased"'),BLK(' ('),ITA('BOI v BOJ',{color:'1F4E79'}),BLK('; '),ITA('Re Shankar Alan',{color:'1F4E79'}),BLK(').')),
p(BLK('A fair-minded, informed, and reasonable observer would note that Yayamukar:')),
pi(BLK('(a) Was '),BLD('appointed by the President on PM\'s advice'),BLK(' — the PM whose policy is under challenge;')),
pi(BLK('(b) Was designated '),BLD('specifically to hear this case'),BLK(' under Art 95(5)(a) — a power that creates structural dependence on the executive for case-specific appointment;')),
pi(BLK('(c) Is a '),BLD('retired army Chief'),BLK(' — institutionally aligned with national security establishment; brings an inherent perspective sympathetic to the PM\'s position that NS completion is important;')),
pi(BLK('(d) Holds a '),BLD('1-year term'),BLK(' — creating the potential for executive influence over renewal;')),
pi(BLK('(e) Was not appointed as part of the ordinary judicial appointment process but under an '),BLD('exceptional, case-specific power'),BLK('.')),
p(BLK('The aggregate of these factors would '),BLD('reasonably lead a fair-minded observer to suspect bias'),BLK('. This is not a case of mere association with a party — it is structural: the executive is effectively '),BLD('choosing its own judge'),BLK(' for a case against itself.')),

H3('Separation of Powers — Liyanage Principle'),
p(BLK('In '),ITA('Liyanage v The Queen',{color:'1F4E79'}),BLK(' (PC, Ceylon), legislation that was directed specifically at the outcome of pending criminal proceedings was held unconstitutional — the legislature cannot interfere with the judicial function by targeting specific cases. The principle: the executive cannot select the judge for a case in which the executive itself is the respondent, without creating a constitutional infringement of the separation of powers.')),
p(BLK('In '),ITA('Mohammad Faizal bin Sabtu v PP',{color:'1F4E79'}),BLK(': Separation of powers is part of Singapore\'s constitutional structure; Parliament (and a fortiori the executive) may not enact laws or take actions inconsistent with this principle. Art 95(5)(a) gives the President a formal power to make case-specific appointments — but the '),BLD('exercise of that power'),BLK(' to designate Yayamukar for this specific case goes beyond the provision\'s legitimate purpose of facilitating the disposal of special court business, and constitutes executive interference with the judicial function.')),

H3('Doctrine of Necessity — Cannot Apply'),
p(BLK('The common law exception to the rule against bias is the doctrine of necessity: bias-creating circumstances may be tolerated if there is '),BLD('no competent alternative forum'),BLK(' or '),BLD('no quorum can be formed without'),BLK(' the biased decision-maker ('),ITA('Khong Kin Hoong Lawrence v Singapore Polo Club',{color:'1F4E79'}),BLK('). There is no suggestion that ARA\'s case could not be heard by properly qualified, independently appointed, and tenured judges of the Supreme Court. Necessity is inapplicable.')),

purpBox('★  STRATEGIC ADVICE (Purple) — ARA\'s Case', [
  boxLabel('Argument sequence and remedies', '7030A0'),
  boxLine(PRP_B('FIRST MOVE (before the hearing):'),PRP(' Apply for Yayamukar to RECUSE HIMSELF from hearing ARA\'s challenge on grounds of apparent bias (BOI v BOJ test). If he declines, apply for a PROHIBITING ORDER to restrain him from proceeding. This avoids tainting the hearing before ARA can raise its substantive arguments.')),
  boxLine(PRP_B('SECOND MOVE (challenging the appointment itself):'),PRP(' Seek a DECLARATORY ORDER that Yayamukar\'s appointment is ultra vires Art 95 — (a) he lacks advocate qualifications under the SCJA; and/or (b) a 68-year-old cannot be appointed as a substantive SC Judge under Art 98(1). If his appointment is void, the Art 95(5)(a) designation also falls.')),
  boxLine(PRP_B('THIRD MOVE (Art 12 and judicial independence challenge to PM\'s policy):'),PRP(' Once a properly constituted court is constituted, apply for a DECLARATORY ORDER that the PM\'s NS policy violates Art 12(1) (applies Syed Suhail two-step, "searching scrutiny" given impact on constitutionally fundamental judicial independence) and/or infringes the unwritten constitutional principle of judicial independence as an implied constitutional norm derived from Art 93 read with the separation of powers.')),
  boxLine(PRP_B('PRIORITY ARGUMENT:'),PRP(' The Art 95(5)(a) designation of Yayamukar to hear this specific case is the strongest single argument — it is a direct structural conflict of interest that a Singapore court should find troubling regardless of its position on judicial independence more broadly. Make this the centrepiece of ARA\'s immediate application; it is also the most actionable on an urgent basis.')),
  boxLine(PRP_B('ART 12 AS A SECONDARY BUT HIGH-VALUE ARGUMENT:'),PRP(' Per the examiner\'s hint, Art 12 is the key substantive constitutional challenge to the PM\'s policy. Frame it under Syed Suhail (executive action, not legislation): the PM\'s policy decision treats NS-completers and non-completers differently; this differentiates them in a judicial appointment context where they are equally situated qua qualified lawyers; the "national security" justification does not bear a sufficient rational relation to the object of judicial appointments (competence, independence); "searching scrutiny" applies because the policy affects the administration of justice and thus the rights of all persons whose liberty may be determined by Singapore courts.')),
]),

// =========================================================================
PB(),
H1('AY2024–25 Q4 — Art 9: "Overly Restrictive Manner"'),
H2('Question'),
p(BLK('"Singapore courts have read Article 9 in an overly restrictive manner." Critically discuss.')),
pinkBox('Examiner Feedback — Q4 (AY24-25)', [
  boxLabel('What examiners required', '9B1F6E'),
  boxLine(BLK('✓ Art 9(1): Definitions of "life", "liberty", "in accordance with law" — AND ALL OF THEM, not just "life and personal liberty"')),
  boxLine(BLK('✓ Art 9(3): Right to counsel — timing, notification, legal assistance provision')),
  boxLine(BLK('✓ Evaluation in line with a clearly articulated theory of constitutional interpretation (e.g., purposive, textualist, SOP-based deference)')),
  boxLine(RED('✗ Poorer essays: Merely descriptive; lacked discussion of key issues; abstract discussion of interpretation without engaging with specific Art 9 provisions')),
  boxLine(BLK('Good essays: Discussed courts\' current positions on ALL issues, then evaluated them against a justified theory.')),
]),
SP(),

H2('Thesis'),
p(BLK('Singapore courts have read Art 9 in a manner that is, by and large, '),BLD('overly restrictive'),BLK(' — but not uniformly so, and some restrictions are constitutionally defensible. The courts\' approach is best characterised as a '),BLD('cautious purposivism restrained by separation-of-powers anxiety'),BLK(': they acknowledge that Art 9 must mean more than its barest textual minimum, but are reluctant to let that acknowledgment run far enough to give Art 9 real constitutional force. The result is a provision that formally protects life and personal liberty, but operationally confines those protections to a narrow band of circumstances.')),

H2('I.  "Life or Personal Liberty" — The Scope Question'),
H3('(A) Early Position: Narrow Textualism'),
pi(ITA('Lo Pui Sang v Murugasu',{color:'1F4E79'}),BLK(': Art 9 does not incorporate personal liberty to contract — refers only to unlawful incarceration/detention.')),
pi(ITA('Tan Eng Hong v AG',{color:'1F4E79'}),BLK(' (HC): Art 9 does not extend to privacy, human dignity, personal autonomy. Jurisprudence "eschews wide interpretations."')),
pi(ITA('Lim Meng Suang v AG',{color:'1F4E79'}),BLK(' (CA): Right to privacy and personal autonomy ought not be read into "life or personal liberty." Phrase "life" should be interpreted narrowly in accordance with "personal liberty" and Art 9\'s context.')),

H3('(B) Modest Expansion: Yong Vui Kong v PP [2015] (Caning)'),
p(BLK('The CA traced Art 9(1)\'s lineage through the Magna Carta (1215), Art 21 of the Indian Constitution, and Blackstone\'s three absolute rights (personal security, personal liberty, private property). Held that Art 9(1) is '),BLD('not limited'),BLK(' to unlawful incarceration or execution — it also protects against '),BLD('the unlawful use of force against bodily integrity'),BLK(', including by way of criminal punishment such as caning.')),
p(BLK('This is a meaningful expansion: courts acknowledged that Art 9 has a purposive historical lineage extending beyond bare detention. However, the expansion is confined to physical force against the body — not extended to autonomy, dignity, or privacy.')),

H3('(C) Tan Seng Kee [2022] — Confirmation and Confinement'),
p(BLK('The CA in TSK confirmed the YVK (2015) expansion to bodily integrity but also confirmed the limits: Art 9(1) requires '),BLD('actual or imminent deprivation'),BLK(' — mere chilling effects do not suffice. No freestanding right to conduct one\'s life free of criminalisation absent actual/imminent deprivation. Unenumerated substantive rights cannot be read into the Constitution ("would entail judges sitting as super-legislature" — YVK (2015) at [73]-[75]).')),
amberBox('EVALUATIVE — Is the restriction on "life or personal liberty" overly restrictive?', [
  boxLabel('The key evaluative point — comparing the competing approaches', 'C55A11'),
  boxLine(BLK('YES, overly restrictive argument: (i) Ong Ah Chuan directed a "generous interpretation" avoiding "austerity of tabulated legalism" — but Lo Pui Sang, LMS, and TSK on Art 9(1) are the opposite of generous. (ii) Indian and Malaysian courts (Maneka Gandhi; Tan Tek Seng (MY)) have adopted an expansive reading of equivalent provisions to include livelihood, dignity, and personal autonomy — these are not whimsical expansions but principled constitutional developments. (iii) If Art 9 only protects against physical detention/force, Art 13 (freedom of movement) would be redundant — the relationship between the provisions suggests Art 9 was meant to have broader scope.')),
  boxLine(BLK('NO, not overly restrictive argument: (i) Singapore\'s framers deliberately adopted Art 21 of the Indian Constitution WITHOUT the due process clause — a conscious rejection of the broader American formulation. (ii) YVK (2015) itself noted the Wee Commission\'s rejection of inhuman punishment prohibition — constitutional design choices preclude judicial implication. (iii) SOP concern is genuine: if courts can read any value into Art 9 as "personal liberty," Parliament cannot legislate without constant constitutional challenge. The Rajeevan/TSK approach preserves legislative space.')),
  boxLine(BLK('Evaluative recommendation: The better view is that the current approach IS overly restrictive in one important respect: it leaves a constitutionally enumerated right with very little protective bite. If Art 9 protects only against formal detention and physical force, it adds essentially nothing to the criminal procedure protections that would exist at common law anyway. A constitutional provision of this significance, in a supreme law constitution, should do more work than this.')),
]),

H2('II.  "In Accordance with Law" — FRNJ and Absurdity'),
H3('What "In Accordance with Law" Has Been Held to Mean'),
p(BLK('The courts have rejected pure positivism ('),ITA('Jabar v PP',{color:'1F4E79'}),BLK('\'s positivist dicta was explained in '),ITA('YVK (2010)',{color:'1F4E79'}),BLK(') in favour of a view that "law" incorporates fundamental rules of natural justice.')),
p(BLK('Per '),ITA('Tan Seng Kee',{color:'1F4E79'}),BLK(' [2022], the following requirements flow from "in accordance with law":')),
pi(BLK('(a) Statute must comply with FRNJ — procedural rights aimed at securing a fair trial (audi alteram partem; nemo judex in re sua)')),
pi(BLK('(b) Statute cannot be colourable legislation targeted at specific individuals')),
pi(BLK('(c) Statute cannot be absurd or arbitrary')),
pi(BLK('(d) Statute cannot be contrary to the rule of law')),

H3('FRNJ — Fixed at 1963'),
p(BLK('In '),ITA('Jumaat bin Mohamed Sayed v AG',{color:'1F4E79'}),BLK(' [2023]: "What Lord Diplock held in 1980 in '),ITA('Ong Ah Chuan',{color:'1F4E79'}),BLK(' as the fundamental rules of natural justice at the time the Constitution came into force stands as the law today." FRNJ is frozen at its 1963 common law content — the presumption of innocence at any particular stringency level does not form part of FRNJ.')),
p(BLK('This means the prohibition on torture (in its non-interrogative context), the right to proportionate punishment, and the right against mandatory sentencing without judicial discretion all fall outside FRNJ in Singapore jurisprudence.')),
amberBox('EVALUATIVE — Is freezing FRNJ at 1963 overly restrictive?', [
  boxLabel('Strongest evaluative point in the essay', 'C55A11'),
  boxLine(BLK('Argument that this IS overly restrictive: (i) Constitutions are made to endure — freezing FRNJ at the legal standards of 1963 means the Constitution\'s protection of life and liberty grows MORE anachronistic with each passing decade while criminal procedure becomes ever more sophisticated. (ii) Lord Diplock in Haw Tua Taw suggested FRNJ might develop over time — the Singapore courts rejected this in favour of a static conception. (iii) The absurdity standard (per YVK (2010); TSK) requires legislation to be SO absurd it could not have been contemplated — this is an extraordinarily high threshold that provides little real constitutional check on Parliament.')),
  boxLine(BLK('Counter: The courts\' position respects constitutional design. The Wee Commission explicitly rejected incorporating a prohibition against inhuman punishment. Reading such a prohibition in would be contrary to "evident constitutional intent" and would transform the courts into a constitutional convention amending the constitution judicially.')),
]),

H2('III.  Article 9(3) — Right to Counsel'),
H3('Nature of the Right — Negative Right (Rajeevan)'),
p(BLK('In '),ITA('Rajeevan Edakalavan v PP',{color:'1F4E79'}),BLK(': Art 9(3) is a purely negative right. "Shall be allowed" to consult counsel imposes no positive obligation on the state to inform the accused of this right. An accused person who does not know of the right cannot exercise it — but the courts\' position is that this does not render the right illusory.')),
p(BLK('Critique (Ho Hock Lai, '),ITA('"Recent (Non-) Developments in An Arrested Person\'s Right to Counsel"',{italics:true}),BLK(' [2014]): "If the access is denied until the completion of investigation, the safeguard only kicks in after it has lost much of its relevance, thereby depriving the term \'arrest\' in Art 9(3) of any meaningful role in the exercise of purposive interpretation." An arrested person who does not know of the right cannot exercise it — making it functionally hollow for those without legal training.')),
amberBox('EVALUATIVE — Rajeevan: Inconsistent with Ong Ah Chuan?', [
  boxLabel('Borderline: Purposive interpretation would demand more', 'C55A11'),
  boxLine(BLK('Ong Ah Chuan directed courts to give Part IV rights a "generous interpretation" avoiding "austerity of tabulated legalism." But Rajeevan\'s reading of Art 9(3) as creating no duty to notify is precisely the kind of formalistic, parsimonious interpretation that Ong Ah Chuan warned against. The right to be INFORMED of the grounds of arrest (expressly provided in Art 9(3) — "shall be informed") is textually distinguished from the right to counsel ("shall be allowed to consult") — but the distinction between being informed of grounds vs informed of the right to counsel is harder to justify purposively when both serve the same function: ensuring the arrested person can effectively exercise their rights.')),
  boxLine(BLK('Malaysia requires police to inform suspects of their right to counsel before questioning. Hong Kong allows delay only on specific grounds with a strict 48-hour cap. These comparative examples show the balance can be struck differently and that effective police investigation and prompt access to counsel are not irreconcilable.')),
]),

H3('Timing — James Raj (HC and CA)'),
p(BLK('In '),ITA('James Raj (HC)',{color:'1F4E79'}),BLK(': Right arises immediately upon arrest; "reasonable time" = only necessary or unavoidable administrative/practical delays. The onus is on the police to justify delay.')),
p(BLK('In '),ITA('James Raj (CA)',{color:'1F4E79'}),BLK(': Affirmed '),ITA('Jasbir Singh',{color:'1F4E79'}),BLK(' — right to counsel only after "reasonable time" having elapsed, to allow police to conduct investigations. What is "reasonable" is a question of fact — two weeks was previously held reasonable ('),ITA('Jasbir Singh',{color:'1F4E79'}),BLK(').')),
p(BLK('Critique: The CA\'s approach leaves police with considerable latitude to deny meaningful access to counsel during the most critical phase of investigation when confessions are most likely to be extracted. The Singapore approach is an outlier compared to other common law jurisdictions.')),

H3('Provision of Counsel — Iskandar bin Rahmat v AG [2024]'),
p(BLK('HC: Art 9(3) does not confer a right to be '),BLD('provided with'),BLK(' counsel. The right is to "consult and be defended by a legal practitioner of his choice if that counsel is willing and able" ('),ITA('Balasundaram v PP',{color:'1F4E79'}),BLK('). No constitutional obligation to provide legal aid — even for death row prisoners seeking counsel for post-appeal applications.')),
p(BLK('This represents the outer limit of the courts\' restrictive approach: a person who cannot afford counsel and cannot obtain pro bono representation is functionally denied Art 9(3) protection — but the Constitution, as read, provides no remedy.')),

H2('IV.  Is the Overall Reading "Overly" Restrictive? — Evaluation'),
p(BLK('Factors suggesting the reading is '),BLD('overly restrictive'),BLK(':')),
pi(BLK('(i) Art 4 declares the Constitution supreme. A provision that adds no protection beyond what common law would provide anyway (against physical force; against compelled confessions) has failed its constitutional mandate of being a '),BLD('higher law'),BLK(' constraining Parliament.')),
pi(BLK('(ii) The "generous interpretation" directive from '),ITA('Ong Ah Chuan',{color:'1F4E79'}),BLK(' was meant to be the governing principle for Part IV liberties — but the jurisprudence on Art 9 systematically interprets AGAINST generosity at every margin: life = physical force only; FRNJ = frozen at 1963; right to counsel = negative, deferred, non-assisted.')),
pi(BLK('(iii) The structural inconsistency: If Art 9 covers only detention and physical force, and Art 13 covers freedom of movement (which overlaps with liberty), Art 9\'s scope becomes puzzlingly narrow. A purposive reading of the structure of Part IV suggests Art 9 was meant to be broader.')),
p(BLK('Factors suggesting the reading is '),BLD('justifiable'),BLK(':')),
pi(BLK('(i) Constitutional design: The framers deliberately departed from the Indian and US formulations. Where design choices are clear, courts should not override them. The Wee Commission rejections are powerful evidence of framers\' intent.')),
pi(BLK('(ii) SOP: Allowing courts to read expansive substantive rights into Art 9 risks transforming the judiciary into an unelected constitutional convention. The restraint in '),ITA('TSK',{color:'1F4E79'}),BLK(' reflects awareness of this risk.')),
pi(BLK('(iii) YVK (2015) is not nothing: The extension of Art 9 to bodily integrity beyond mere detention is meaningful. If Singapore courts were truly hostile to Art 9, they would not have expanded it even to that extent. The jurisprudence reflects careful rather than wholesale restrictiveness.')),
p(BLK('Balanced conclusion: The reading is overly restrictive as to '),BLD('"life or personal liberty"'),BLK(' (where even modest expansions like privacy/dignity are categorically refused) and as to FRNJ (where a static 1963 baseline cannot keep pace with a maturing constitutional order). It is '),BLD('more defensible'),BLK(' as to Art 9(3) (where the negative right formulation has textual support, even if the practical consequences are troubling). The overall picture is of a court that acknowledges the tension between constitutional promise and constitutional performance but resolves it consistently in favour of restraint.')),

purpBox('★  STRATEGIC NOTE (Purple) — Art 9 Essay Technique', [
  boxLabel('To maximise marks — structure and evaluation strategy', '7030A0'),
  boxLine(PRP('Lead with a clear thesis that accepts the statement is "largely but not entirely correct." Unconditional agreement or disagreement will miss marks. The examiner-praised essays articulated a "clearly justified theory of constitutional interpretation" — adopt a purposive framework as your evaluative lens.')),
  boxLine(PRP('Organise the essay around the three Art 9 components the examiner specified: (1) life/personal liberty + in accordance with law; (2) right to counsel (timing, notification, provision). Addressing only one or two = incomplete.')),
  boxLine(PRP('The highest-value evaluative points are: (a) The internal inconsistency between the "generous interpretation" mandate (Ong Ah Chuan) and the systematically narrow outcomes in Art 9 cases; (b) The structural argument that Art 9\'s narrow scope renders it nearly coextensive with Art 13, making one of them redundant; (c) The comparative point (Malaysia/HK) showing that effective police investigation and meaningful right to counsel are compatible — Singapore\'s balance is deliberately conservative, not structurally necessary.')),
]),

// end
HR(),
p(BLK('END OF MODEL ANSWERS — AY2023–24 Q3,4,5 and AY2024–25 Q3,4')),
p(BLK('Colour key: Black = main argument | ',{bold:false}),
  PRP('Purple = strategic/remedies advice'),
  BLK(' | '), AMB('Amber = evaluative turning points')),
];

const doc = new Document({
  styles:{
    default:{document:{run:{font:'Arial',size:22}}},
    paragraphStyles:[
      {id:'Heading1',name:'Heading 1',basedOn:'Normal',next:'Normal',quickFormat:true,
       run:{size:36,bold:true,font:'Arial',color:'1A1A2E'},
       paragraph:{spacing:{before:480,after:200},outlineLevel:0}},
      {id:'Heading2',name:'Heading 2',basedOn:'Normal',next:'Normal',quickFormat:true,
       run:{size:28,bold:true,font:'Arial',color:'1F3864'},
       paragraph:{spacing:{before:280,after:140},outlineLevel:1}},
      {id:'Heading3',name:'Heading 3',basedOn:'Normal',next:'Normal',quickFormat:true,
       run:{size:24,bold:true,font:'Arial',color:'2E4053'},
       paragraph:{spacing:{before:200,after:100},outlineLevel:2}},
      {id:'Heading4',name:'Heading 4',basedOn:'Normal',next:'Normal',quickFormat:true,
       run:{size:22,bold:true,font:'Arial',color:'34495E'},
       paragraph:{spacing:{before:140,after:80},outlineLevel:3}},
    ]
  },
  sections:[{
    properties:{page:{size:{width:12240,height:15840},margin:{top:1080,right:1080,bottom:1080,left:1080}}},
    children
  }]
});

Packer.toBuffer(doc).then(buf=>{
  fs.writeFileSync('/home/claude/CAAL_Model_Answers.docx',buf);
  console.log('Done!');
}).catch(e=>{console.error(e);process.exit(1);});
