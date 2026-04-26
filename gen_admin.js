const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  BorderStyle, WidthType, ShadingType,
  Table, TableRow, TableCell, PageBreak
} = require('docx');
const fs = require('fs');

// ── run helpers ─────────────────────────────────────────────────────────────
const R   = (t,o={}) => new TextRun({text:t, font:'Arial', size:22, ...o});
const B   = (t,o={}) => R(t,{bold:true,...o});
const I   = (t,o={}) => R(t,{italics:true,...o});
const BI  = (t,o={}) => R(t,{bold:true,italics:true,...o});
const PRP = (t,o={}) => R(t,{color:'7030A0',...o});
const PRPB= (t,o={}) => R(t,{color:'7030A0',bold:true,...o});
const AMB = (t,o={}) => R(t,{color:'C55A11',...o});
const AMBB= (t,o={}) => R(t,{color:'C55A11',bold:true,...o});
const CL  = (t,o={}) => R(t,{color:'1F4E79',italics:true,...o});
const CLB = (t,o={}) => R(t,{color:'1F4E79',bold:true,...o});
const RED = (t,o={}) => R(t,{color:'C00000',...o});
const REDB= (t,o={}) => R(t,{color:'C00000',bold:true,...o});
const GRN = (t,o={}) => R(t,{color:'375623',...o});

// ── paragraph helpers ────────────────────────────────────────────────────────
const p   = (...r) => new Paragraph({children:r, spacing:{after:140}});
const pb  = (...r) => new Paragraph({children:r, spacing:{after:80,before:80}});
const pi  = (...r) => new Paragraph({children:r, spacing:{after:100}, indent:{left:480}});
const pii = (...r) => new Paragraph({children:r, spacing:{after:80},  indent:{left:960}});
const SP  = ()     => new Paragraph({children:[R('')], spacing:{after:100}});
const PB  = ()     => new Paragraph({children:[new PageBreak()]});
const HR  = ()     => new Paragraph({
  border:{bottom:{style:BorderStyle.SINGLE,size:6,color:'ADB9CA'}},
  spacing:{after:180,before:80}, children:[]
});

// ── heading helpers ──────────────────────────────────────────────────────────
const H1 = t => new Paragraph({
  heading:HeadingLevel.HEADING_1,
  children:[new TextRun({text:t, font:'Arial', size:36, bold:true, color:'1A1A2E'})],
  spacing:{before:480,after:200}
});
const H2 = t => new Paragraph({
  heading:HeadingLevel.HEADING_2,
  children:[new TextRun({text:t, font:'Arial', size:28, bold:true, color:'1F3864'})],
  spacing:{before:280,after:140}
});
const H3 = t => new Paragraph({
  heading:HeadingLevel.HEADING_3,
  children:[new TextRun({text:t, font:'Arial', size:24, bold:true, color:'2E4053'})],
  spacing:{before:200,after:100}
});
const H4 = t => new Paragraph({
  heading:HeadingLevel.HEADING_4,
  children:[new TextRun({text:t, font:'Arial', size:22, bold:true, color:'34495E'})],
  spacing:{before:140,after:80}
});

// ── box builder ──────────────────────────────────────────────────────────────
const mkBox = (bg, accent, rows) => new Table({
  width:{size:9200, type:WidthType.DXA}, columnWidths:[9200],
  rows:[new TableRow({children:[new TableCell({
    width:{size:9200, type:WidthType.DXA},
    shading:{fill:bg, type:ShadingType.CLEAR},
    margins:{top:100,bottom:100,left:140,right:100},
    borders:{
      top:{style:BorderStyle.SINGLE,size:2,color:accent},
      bottom:{style:BorderStyle.SINGLE,size:2,color:accent},
      left:{style:BorderStyle.SINGLE,size:8,color:accent},
      right:{style:BorderStyle.NONE}
    },
    children:rows
  })]})],
});
const pinkBox  = rows => mkBox('FDE8F4','9B1F6E',rows);
const purpBox  = rows => mkBox('F0E6FF','7030A0',rows);
const amberBox = rows => mkBox('FFF3E0','C55A11',rows);
const blueBox  = rows => mkBox('EBF5FB','1F4E79',rows);
const greenBox = rows => mkBox('E8F5E9','1E8449',rows);

const lbl = (t,c='1A1A2E') => new Paragraph({
  children:[new TextRun({text:t, font:'Arial', size:21, bold:true, color:c})],
  spacing:{after:60}
});
const bl  = (...r) => new Paragraph({children:r, spacing:{after:80}});
const bli = (...r) => new Paragraph({children:r, spacing:{after:80}, indent:{left:360}});

// ═══════════════════════════════════════════════════════════════════════════
// DOCUMENT CONTENT
// ═══════════════════════════════════════════════════════════════════════════
const children = [

// ── COVER PAGE ─────────────────────────────────────────────────────────────
H1('CAAL Administrative Law — Model Answers'),
p(B('Section A Q1: '), R('AY2024-25 (Gamestonk)  |  AY2023-24 (Grabbu/SPCC)  |  AY2022-23 (Gerry Lee/SBA)')),
p(R('Colour key: '),
  B('Black'), R(' — main argument   '),
  new TextRun({text:'Purple',font:'Arial',size:22,color:'7030A0',bold:true}),
  R(' — strategic / remedies advice   '),
  new TextRun({text:'Amber',font:'Arial',size:22,color:'C55A11',bold:true}),
  R(' — evaluative turning points / alternative positions   '),
  new TextRun({text:'Blue italic',font:'Arial',size:22,color:'1F4E79',italics:true}),
  R(' — case citations')),
HR(),

// ═══════════════════════════════════════════════════════════════════════════
PB(),
H1('AY2024-25  Q1 — GAMESTONK'),
// ═══════════════════════════════════════════════════════════════════════════
p(B('Fact overview: '), R('Gamestonk, a local board-game start-up (capital $2m, below the MTI Circular $5m '
  +'threshold), was declared a restricted entity by the Minister under the Corporate Finances Control '
  +'Act 2015 (CFCA), fined $50,000, had its ACRA appeal rejected, and was denied authorisation for '
  +'two payments. Three discrete decisions require separate analysis.')),

pinkBox([
  lbl('Examiner Feedback — AY2024-25 Q1','9B1F6E'),
  bl(R('✓ Good scripts tackled ALL THREE decisions and spotted most of the issues above.')),
  bl(R('✓ Best scripts also discussed: whether Tan Seng Kee-type extraordinary circumstances '
    +'existed for the SLE claim; whether ACRA could avail itself of the necessity principle; '
    +'whether s 7 CFCA validly ousts judicial review (citing Nagaenthran).')),
  bl(REDB('✗ Weaker scripts: '),RED('spending too much time on irrelevant standing and amenability '
    +'(both obviously satisfied); treating the MTI Circular as subsidiary legislation requiring '
    +'gazetting; reviewing the first decision on grounds that Circular precedent facts were not met '
    +'(Circular is a policy, not a power-conferring provision — there is no strict need to follow it); '
    +'reviewing irrationality of the MTI Circular itself (non-starter).')),
  bl(REDB('✗ Key missed issue: '),RED('The refusal of the FIRST payment (to Singapore seller) is '
    +'immediately unlawful — s 5 only allows the Minister to refuse authorisation for counterparties '
    +'OUTSIDE Singapore. Get this quick technical knock-out first.')),
  bl(REDB('✗ Key missed issue: '),RED('The fine of $50,000 — the Minister has NO power to impose '
    +'a fine under the 2015 Act at all. Plain ultra vires.')),
]),
SP(),

H2('PRELIMINARY: Structure of Advice — Three Decisions'),
blueBox([
  lbl('Issue map — three decisions to advise on','1F4E79'),
  bl(B('Decision 1:'), R(' Minister\'s declaration of Gamestonk as restricted entity (s 3) + '
    +'fine of $50,000')),
  bl(B('Decision 2:'), R(' ACRA panel\'s rejection of Gamestonk\'s appeal (s 6)')),
  bl(B('Decision 3:'), R(' MTI Permanent Secretary\'s refusal to authorise two payments '
    +'(ss 4–5) — two sub-issues: $150,000 (Singapore seller) and $99,000 (Ruritanian firm)')),
  bl(R('Note on approach: Amenability of all three decisions to judicial review is not in issue. '
    +'Minister and ACRA are statutory public bodies exercising statutory powers; their decisions '
    +'are clearly public law decisions subject to O 24 Rules of Court ('),CL('Datafin'),R(' '
    +'nature test). Do NOT waste time on this.')),
]),
SP(),

// ── DECISION 1 ──────────────────────────────────────────────────────────────
H2('DECISION 1: Minister\'s Declaration (s 3) + $50,000 Fine'),

H3('Ground 1A — Ultra Vires: The Fine Has No Statutory Basis'),
p(B('This is the single most straightforward ground and should be argued first.'),
  R(' The CFCA 2015 contains no provision empowering the Minister to impose fines. Section 3 '
  +'only grants power to "declare" a company a restricted entity. Section 4 sets payment limits. '
  +'Section 5 governs payment authorisation. There is no fine-conferring provision anywhere '
  +'in the Act. The Minister\'s direction that Gamestonk pay $50,000 is therefore '),
  B('ultra vires and void'), R(' — it is a purported exercise of a power that does not exist.')),
p(R('Principle: '),CL('Tan Seng Kee v AG'),R(' [2022] — public authorities may only do what '
  +'law authorises. '),CL('Chng Suan Tze v MHA'),R(' [1989] — "the notion of a subjective or '
  +'unfettered discretion is contrary to the Rule of Law. All power has legal limits." '
  +'The Ministry cannot create a penalty regime through executive fiat.')),

H3('Ground 1B — Breach of Legitimate Expectation (SLE) from MTI Circular'),
p(R('The MTI Circular (published on MTI\'s official website in 2016) stated that the Minister '
  +'will NOT declare a company a restricted entity if: (a) its business is not part of a major '
  +'industry; or (b) its capital is no more than $5,000,000. Gamestonk\'s capital is $2,000,000 — '
  +'squarely within (b). Gamestonk reasonably relied on the Circular in deciding to incorporate '
  +'in Singapore. This gives rise to a claim for '),
  B('substantive legitimate expectation (SLE)'), R('.')),
p(R('SLE framework — '),CL('Chiu Teng @ Kallang Pte Ltd v Singapore Land Authority'),
  R(' [2014]; endorsed in '),CL('Tan Seng Kee v AG'),R(' [2022] at [115]-[116]:')),
pi(B('(a) Clear and unambiguous representation: '),R('The Circular on the MTI website is '
  +'a clear, public, and unqualified statement of ministerial policy. It is not merely '
  +'aspirational — it states the Minister "will not declare" companies meeting the criteria. '
  +'This is sufficiently specific and unambiguous.')),
pi(B('(b) Representation made by body with authority: '),R('MTI is the relevant ministry; '
  +'the Minister of Trade directly administers the CFCA. MTI\'s website representations '
  +'are made with implied ministerial authority.')),
pi(B('(c) Reasonable and detrimental reliance: '),R('Gamestonk\'s founders were "initially '
  +'cautious about incorporating in Singapore given the 2015 Act" but concluded — by virtue '
  +'of the Circular — they were unlikely to be declared a restricted entity. They incorporated '
  +'in 2017 and built the business. Incorporation in Singapore constitutes clear detrimental '
  +'reliance.')),

amberBox([
  lbl('EVALUATIVE — SLE: Does Tan Seng Kee apply to limit the claim?','C55A11'),
  bl(AMBB('Key issue: '),AMB('In '),CL('Tan Seng Kee'),AMB(' [2022], the SGCA held that SLE '
    +'is not available where the representation was made by Parliament (not merely the executive) '
    +'and where the representation went to life and liberty. The court confined "extraordinary '
    +'circumstances" to representations by Parliament itself, where life and liberty were '
    +'directly at stake.')),
  bl(AMB('Here: The Circular was an executive policy representation by MTI — NOT a parliamentary '
    +'promise. Tan Seng Kee\'s limitation therefore does NOT apply. SLE from executive policy '
    +'representations remains fully available under '),CL('Chiu Teng'),AMB('.')),
  bl(AMB('Counter-argument the Government may raise: The Circular was an informal ministerial '
    +'policy, not a statutory rule — it cannot fetter statutory discretion. Per '),
    CL('Re Findlay'),AMB(' [1985] (UK HL): a policy representation cannot prevent the decision-maker '
    +'from departing where there is a compelling countervailing public interest.')),
  bl(AMBB('Gamestonk\'s response: '),AMB('No compelling public interest is identified here. '
    +'The Minister\'s stated reason ("degenerate millennial hobby"; "political instability") '
    +'is plainly irrational and unconnected to the Act\'s stated purpose of safeguarding '
    +'national interests through regulation of corporate finance. This is not a case where '
    +'departure from the Circular is justified by a legitimate competing interest.')),
]),
SP(),

H3('Ground 1C — Improper Purpose / Illegality'),
p(R('The Minister\'s stated reasons expose the declaration to challenge for '),
  B('improper purpose'),R(':')),
pi(B('Reason 1 — "degenerate millennial hobby":'),R(' The CFCA 2015 is stated in its long '
  +'title to be "An Act to restrict and regulate corporate expenditure to safeguard national '
  +'interests." The declared purpose of combating "millennial unproductivity" and eradicating '
  +'a "social evil" has nothing to do with safeguarding national interests through corporate '
  +'finance regulation. Per '),CL('World Development Movement'),R(' — where a decision-maker '
  +'acts for a purpose beyond the statutory purpose, the decision is unlawful regardless of '
  +'whether the statutory purpose could theoretically also be served.')),
pi(B('Reason 2 — "political instability" from North Coast Plan:'),R(' The Minister expressly '
  +'mentions concern that political board games "may corrupt the minds of young Singaporeans '
  +'and stir political instability for the future." This is a political motive that goes '
  +'beyond the CFCA\'s corporate finance purpose and may additionally engage concerns '
  +'about executive overreach into expression/speech (cf. Art 14 of the Constitution — '
  +'though constitutional challenge is out of scope for the admin law Q1).')),
amberBox([
  lbl('EVALUATIVE — Can the Minister argue mixed purposes?','C55A11'),
  bl(AMB('The Government may argue that even if one reason is invalid, the decision '
    +'is saved by the valid purpose (corporate finance regulation). Per '),
    CL('Public Service Board of New South Wales v Osmond'),AMB(' — if multiple reasons '
    +'are given and some are valid, the decision stands if the valid reason alone '
    +'would have supported the outcome.')),
  bl(AMB('Counter: On the facts, ALL stated reasons are problematic. There is no valid '
    +'stated reason — "millennial unproductivity" and "political instability" '
    +'are both beyond the Act. Gamestonk was never part of a "major industry" in any '
    +'conventional sense, and its $2m capital falls below the Circular threshold. '
    +'It is implausible that the Minister would have made the declaration based '
    +'on any valid corporate finance concern. The declaration should be quashed.')),
]),
SP(),

H3('Ground 1D — Irrationality'),
p(R('The reasons themselves reveal irrationality. Per '),CL('Council of Civil Service Unions v '
  +'Minister for Civil Service'),R(' [1985] ('),I('GCHQ'),R('): a decision is irrational if '
  +'it is "so outrageous in its defiance of logic or accepted moral standards that no sensible '
  +'person who had applied his mind to the question to be decided could have arrived at it." '
  +'In Singapore, per '),CL('Chng Suan Tze v MHA'),R(', irrationality applies objectively.')),
p(R('Describing board games as a "degenerate millennial hobby" and targeting a $2m start-up '
  +'(below every plausible threshold for "major industry" relevance) as a threat to national '
  +'interests because of a satirical board game is, on any objective assessment, irrational. '
  +'The causal link between Gamestonk\'s activities and the asserted harms is absent.')),

// ── DECISION 2 ──────────────────────────────────────────────────────────────
H2('DECISION 2: ACRA\'s Rejection of Gamestonk\'s Appeal'),

H3('Preliminary — Which Sub-Grounds Apply?'),
p(R('The examiner noted the key question is whether ACRA\'s decision is a '),
  B('forfeiture case'),R(' (affecting existing rights) or an '),B('application case'),R(' '
  +'(seeking new benefits). Gamestonk\'s declaration as a restricted entity limits its '
  +'ability to make payments freely — this is an interference with existing business '
  +'operations and pecuniary rights. The appeal concerns relief from that restriction. '
  +'This is therefore closer to a '),B('forfeiture case'),R(', engaging the full '
  +'audi alteram partem right to a hearing — per '),
  CL('Ridge v Baldwin'),R(' and '),CL('Durayappah v Fernando'),R('.')),

H3('Ground 2A — Apparent Bias: Bob Ong'),
p(R('The three-person ACRA panel included Bob Ong — former MP for North Coast GRC (until '
  +'2020 elections) and Head of the Government\'s Task Force against Millennial Unproductivity. '
  +'Gamestonk\'s North Coast Plan game directly parodied a Singaporean politician named '
  +'Booboo Ong. The test for apparent bias is: whether '),B('"there are circumstances '
  +'which would give rise to a reasonable suspicion or apprehension in a fair-minded '
  +'reasonable person with knowledge of the relevant facts that the decision-maker '
  +'was biased"'),R(' — '),CL('BOI v BOJ'),R(' [2018]; '),CL('Re Shankar Alan s/o Anant '
  +'Kulkarni'),R(' [2007].')),
p(R('A fair-minded observer would note that: (i) Bob Ong\'s own political reputation was '
  +'apparently damaged by North Coast Plan; (ii) he is Head of the Task Force that took '
  +'the position that board games cause "millennial unproductivity"; and (iii) he was '
  +'assigned to adjudicate the appeal of the company responsible for the game that '
  +'embarrassed him. These three cumulative factors would give any reasonable observer '
  +'grounds for suspecting bias — indeed, the examiner confirms Bob Ong was '
  +'"the politician embarrassed by Gamestonk\'s North Coast Plan game."')),

H3('Ground 2B — Denial of Right to be Heard: Bob Ong\'s Excessive Intervention'),
p(R('Bob Ong\'s "persistent questioning" of Gamestonk\'s representatives — asking them to '
  +'"search their soul and consider if that was the right decision for Singapore" — goes '
  +'beyond permissible questioning. Per '),CL('Chiam See Tong v Singapore Democratic Party'),
  R(' and '),CL('Ho Paul v Singapore Medical Council'),R(': a tribunal chair '
  +'who controls proceedings to the point of preventing the applicant from presenting '
  +'their case commits a procedural impropriety. The persistent "soul-searching" question '
  +'reflects a predetermined hostile attitude rather than genuine inquiry, denying '
  +'Gamestonk the effective ability to present its case.')),

amberBox([
  lbl('EVALUATIVE — Could the Necessity Principle save ACRA\'s decision?','C55A11'),
  bl(AMB('The examiner specifically flagged: "whether ACRA could avail itself of the '
    +'principle of necessity (no, because it was not necessary for it to empanel Bob Ong)."')),
  bl(AMB('The necessity doctrine ('),CL('Khong Kin Hoong Lawrence v Singapore Polo Club'),
    AMB(') allows a biased decision-maker to proceed where: (a) there is no other '
    +'competent forum; or (b) a quorum cannot be formed without the biased member. '
    +'Here, ACRA could simply have appointed a different third panellist. Bob Ong\'s '
    +'presence was not necessary — it was avoidable. Necessity does not apply.')),
  bl(AMB('Additionally: ACRA is a statutory body with the power to "adopt a procedure at '
    +'its discretion" (s 6). It could and should have excluded a panellist with such '
    +'a direct personal connection to the subject matter of the appeal. '
    +'Failure to do so is itself procedurally improper.')),
]),
SP(),

// ── DECISION 3 ──────────────────────────────────────────────────────────────
H2('DECISION 3: MTI Perm Sec\'s Refusal to Authorise Payments'),
p(B('This decision has TWO separate sub-issues, each analysed independently. The examiner '
  +'confirmed: "A good lawyer will prioritise the most straightforward and uncontentious '
  +'issues (low-hanging fruit). It would thus have been sensible to get the fine and '
  +'refusal quashed before dealing with the other issues."')),

H3('Sub-Issue 3A — Payment 1: $150,000 to Singapore Seller (Kopi Time rights)'),
p(R('Section 5 CFCA provides: "For the purposes of Section 4, the Minister may only refuse '
  +'written authorisation to make payments to counterparties '),
  B('incorporated or operating outside Singapore'),R(', and only if the Minister is satisfied '
  +'that the payment is not contrary to national interest."')),
p(R('The seller of the rights to manufacture Kopi Time is '),B('a seller in Singapore'),
  R('. This counterparty is incorporated and operating '),B('within'),R(' Singapore. '
  +'Section 5 expressly and specifically limits the Minister\'s power to refuse authorisation '
  +'to counterparties '),I('outside'),R(' Singapore. The Minister has '),
  B('no statutory power whatsoever'),R(' to refuse this payment.')),
p(R('This is a '),B('jurisdictional error'),R(' — the Minister acted outside the scope of '
  +'the power conferred by s 5. Per '),CL('Anisminic Ltd v Foreign Compensation Commission'),
  R(' [1969]; endorsed in Singapore in '),CL('Stansfield Business International Pte Ltd v '
  +'Minister for Manpower'),R(': any decision made outside the limits of jurisdiction is '
  +'void and of no legal effect. Gamestonk is entitled to a '),B('mandatory order'),R(' '
  +'compelling the Perm Sec to authorise this payment — per the examiner: '
  +'"probably yes, since s 5 says that Minister \'may only refuse\' authorisation if precedent '
  +'facts met, and here they were not met since seller was inside Singapore, '
  +'so only one correct decision for the Minister to make."')),
amberBox([
  lbl('EVALUATIVE — Could the Government argue the refusal falls under s 3 (not s 5)?','C55A11'),
  bl(AMB('The Government may argue the refusal flows from the general restricted entity status '
    +'(s 3) rather than specifically from s 5 — meaning the s 5 geographical limitation '
    +'is irrelevant. But this argument fails: s 4 creates the obligation to obtain '
    +'authorisation; s 5 governs the scope of the refusal power. The authorisation regime '
    +'in ss 4-5 is self-contained. Any refusal of a payment authorisation request must '
    +'comply with s 5. The Perm Sec cannot bypass s 5\'s express limitation by claiming '
    +'a broader residual discretion under s 3.')),
]),
SP(),

H3('Sub-Issue 3B — Payment 2: $99,000 to Ruritanian Architectural Firm'),
p(R('Section 4 CFCA: "A restricted entity may not make payments '),
  B('exceeding S$100,000'),R(' to another person without written authorisation from the Minister." '
  +'The second payment is $99,000 — which is '),B('below the $100,000 threshold'),R('. '
  +'Section 4 does not require authorisation for payments at or below $100,000. '
  +'The Perm Sec\'s refusal to authorise a payment that does not require authorisation '
  +'has '),B('no legal effect'),R(' — Gamestonk may make this payment without authorisation. '
  +'The refusal is legally void for want of any jurisdictional basis.')),
p(R('Even if the refusal were treated as a decision with legal effect, it would fail on the '
  +'merits: the '),B('Ruritanian firm is outside Singapore'),R(', so s 5 applies — but '
  +'the payment does not need authorisation in the first place under s 4.')),

H3('Ground 3C — Fettering of Discretion: Acting "On the Advice" of Bob Ong'),
p(R('The Permanent Secretary\'s note confirming that both payment refusals were made "on the '
  +'advice of Bob Ong" — whose opinion that authorising the payments "would send the wrong '
  +'signal about his Task Force\'s efforts to address millennial unproductivity" — raises '
  +'a serious '),B('fettering of discretion'),R(' issue.')),
p(R('Per '),CL('Lim Ah Mee v Minister for Home Affairs'),R(' and '),
  CL('Komoco Motors Pte Ltd v Registrar of Vehicles'),R(' [2008]: a public authority '
  +'must exercise its discretion personally and cannot simply adopt the views of another '
  +'body or individual as its own without any independent evaluation. The Perm Sec has '
  +'demonstrably not applied his own mind to the question of whether these payments '
  +'were contrary to national interest — he has simply adopted Bob Ong\'s political view '
  +'about "millennial unproductivity." This is an '),B('unlawful abrogation of discretion'),R('.')),
p(R('The examiner specifically noted in AY2023-24 (analogous Komoco principle): '
  +'"there was a lack of effort to evaluate the nuances in Komoco." Here, consulting '
  +'Bob Ong and simply deferring to his advice — without any independent national-interest '
  +'analysis — is a textbook case of the Perm Sec abrogating his statutory discretion.')),

H3('Ground 3D — Irrelevant Consideration'),
p(R('Bob Ong\'s concern about "sending the wrong signal about his Task Force\'s efforts" '
  +'is a purely political, personal, and institutional concern of Bob Ong\'s own body. '
  +'It is not a consideration relevant to whether a payment is "contrary to national interest" '
  +'under s 5. Per '),CL('Padfield v Minister of Agriculture'),R(' [1968]; '),
  CL('Tan Seng Kee v AG'),R(': taking into account irrelevant considerations renders '
  +'a decision unlawful regardless of whether the correct outcome might also have been '
  +'available on relevant grounds alone.')),

H3('Ground 3E — Ouster Clause: Section 7 CFCA'),
p(R('Section 7 states: "The Minister\'s decision under Section 5 shall be final." '
  +'This is an '),B('ouster clause'),R(' that purports to exclude judicial review '
  +'of s 5 decisions. The court must assess whether it validly ousts judicial review.')),
p(R('Per '),CL('Nagaenthran a/l K Dharmalingam v AG'),R(' [2019] and '),
  CL('Stansfield Business International'),R(': in Singapore, ouster clauses are '
  +'construed narrowly and do not exclude judicial review for decisions made '
  +'without jurisdiction or in excess of power. A "finality" clause only protects '
  +'decisions made within the four corners of the statutory power — it cannot protect '
  +'a decision that is void for want of jurisdiction.')),
amberBox([
  lbl('EVALUATIVE — Does s 7 oust review of ALL s 5 decisions or only intra vires ones?','C55A11'),
  bl(AMBB('The traditional UK position: '),AMB(CL('Anisminic'),AMB(' held that an ouster clause '
    +'cannot protect a "purported determination" that is in truth void — there is '
    +'nothing to protect. Applied here: if the Perm Sec exceeded s 5 by refusing '
    +'a payment to a Singapore counterparty, the decision is void ab initio '
    +'and s 7\'s finality clause has nothing to bite on.'))),
  bl(AMBB('Singapore position: '),AMB(CL('Nagaenthran'),AMB(' confirmed that Singapore '
    +'courts read ouster clauses narrowly, consistent with the rule of law. '
    +'The examiner expressly notes s 7 should be analysed for whether it '
    +'is a valid ouster clause — and per '),CL('Nagaenthran'),AMB(', it does not '
    +'oust review for ultra vires action. The first payment refusal is ultra vires '
    +'(s 5 geographical limit not met) — s 7 therefore cannot shield it.'))),
]),
SP(),

purpBox([
  lbl('★  STRATEGIC ADVICE (Purple) — Gamestonk: Priorities and Remedies','7030A0'),
  bl(PRPB('PRIORITISATION:'),PRP(' Lead with the two "quick wins" that examiners specifically '
    +'flag as priorities: (1) the $50,000 fine (no statutory basis — immediate ultra vires); '
    +'(2) the first payment refusal ($150,000 — s 5 geographical limit plainly not met). '
    +'These are knock-out points that do not require extended analysis of purpose '
    +'or reasonableness. Establish them quickly and move on.')),
  bl(PRPB('REMEDY SEQUENCE:')),
  bli(PRP('(1) '),PRPB('Quashing order (certiorari):'),PRP(' Quash the declaration (s 3) — '
    +'ultra vires (fine), SLE breach, improper purpose, irrationality. This is the '
    +'primary remedy and cascades to nullify the consequences of restricted entity status.')),
  bli(PRP('(2) '),PRPB('Mandatory order:'),PRP(' Compel the Minister/Perm Sec to grant '
    +'authorisation for the $150,000 Singapore-seller payment — s 5 admits only one '
    +'lawful outcome (authorise) since the counterparty is in Singapore. '
    +'(Examiner: "probably yes, since s 5 says Minister \'may only refuse\' authorisation '
    +'if precedent facts met, and here they were not.")')),
  bli(PRP('(3) '),PRPB('Declaratory relief:'),PRP(' Declare that: (a) the $99,000 payment '
    +'requires no authorisation (below s 4 threshold); (b) the $50,000 fine is void '
    +'for lack of statutory basis; (c) ACRA\'s rejection is vitiated by apparent bias.')),
  bli(PRP('(4) '),PRPB('Prohibiting order:'),PRP(' Pending the hearing, seek interim '
    +'prohibition to prevent Gamestonk being held in breach of any restricted entity '
    +'restrictions while the declaration remains under challenge.')),
  bl(PRPB('ON THE OUSTER CLAUSE:'),PRP(' Do not be deterred by s 7. Argue Nagaenthran: '
    +'ouster clauses protect intra vires decisions, not void ones. The s 5 first payment '
    +'refusal is void (counterparty in Singapore) — s 7 has nothing to protect.')),
  bl(PRPB('ON SLE — ADDITIONAL ARGUMENT:'),PRP(' If Gamestonk\'s declaration is not '
    +'quashed, seek an order that the Minister must reconsider in accordance '
    +'with the MTI Circular — i.e., a mandatory order remitting the matter '
    +'for reconsideration on the basis that the Circular representation must be '
    +'honoured absent compelling countervailing interest (none exists here).')),
]),

// ═══════════════════════════════════════════════════════════════════════════
PB(),
H1('AY2023-24  Q1 — GRABBU / SPCC'),
// ═══════════════════════════════════════════════════════════════════════════
p(B('Fact overview: '), R('Grabbu, a Prekka tech company, sought a Certificate of Approval (COA) '
  +'from the SPCC. Three COA applications were rejected; the third involved a panel hearing '
  +'with procedural defects. The Minister of Trade then terminated Grabbu\'s Singapore '
  +'operations entirely. Two decisions require separate analysis.')),

pinkBox([
  lbl('Examiner Feedback — AY2023-24 Q1','9B1F6E'),
  bl(R('✓ Most recognised that the SPCC decision raised amenability questions under the '
    +'nature test (Datafin). Most recognised jurisdictional error of fact (Oz Warren '
    +'not current legislator), patent error, apparent bias, and abrogation of discretion.')),
  bl(R('✓ Good scripts also noted: SPCC\'s revenue policy ($50m) may be '
    +'manifestly disproportionate/irrational; Yam Seng\'s communication creating a possible LE; '
    +'necessity defence not available to non-statutory body like SPCC; '
    +'Grabbu seeking mandatory order to compel grant of COA (though likelihood is very low).')),
  bl(REDB('✗ Poorer scripts: '),RED('missing out the main points by belabouring '
    +'obvious issues (apparent bias) or non-issues (amenability of Minister\'s decision); '
    +'conflating the two decisions; running out of time on one decision entirely.')),
  bl(REDB('✗ Critical mistake: '),RED('Oz Warren is FORMER, not current, Prekka legislator. '
    +'The Minister\'s s 5 power is triggered by "foreign public officer" shareholding, '
    +'defined in s 2 as requiring CURRENT status. Getting this wrong renders both '
    +'the SPCC corruption finding and the Minister\'s s 5 order unlawful — it is '
    +'the pivotal fact in the question.')),
]),
SP(),

H2('PRELIMINARY: Structure of Advice — Two Decisions'),
blueBox([
  lbl('Issue map','1F4E79'),
  bl(B('Decision 1:'), R(' SPCC\'s rejection of Grabbu\'s third COA application')),
  bl(B('Decision 2:'), R(' Minister of Trade\'s termination order (citing s 5 of the Act)')),
  bl(B('Note on Decision 2:'), R(' The Minister\'s amenability is obvious (statutory power); '
    +'do NOT spend time on this. The SPCC\'s amenability is the interesting threshold question.')),
]),
SP(),

H2('DECISION 1: SPCC\'s Rejection of the Third COA Application'),

H3('Ground 1A — Amenability to Judicial Review (SPCC)'),
p(R('The SPCC is a '),B('self-regulatory body'),R(' — not itself a statutory authority. '
  +'The amenability question requires the '),B('nature test'),R(' from '),
  CL('R v Panel on Take-overs and Mergers, ex p Datafin plc'),R(' [1988] (UK CA), '
  +'applied in Singapore in '),CL('Lawrence Khong Kin Hoong v Singapore Athletic Federation'),
  R(' and '),CL('Kok Seng Chong v Buona Vista'),R('. The test asks whether the body '
  +'exercises a public function or operates within a public framework such that, '
  +'if the body did not exist, a statutory body would have to be created to perform '
  +'its function.')),
p(R('Arguments for amenability:')),
pi(R('(i) SPCC acts with the '),B('acquiescence of MTI'),R(' — described as operating '
  +'"closely" with MTI to facilitate investment. Its COA effectively determines whether '
  +'Prekka companies can do business in Singapore.')),
pi(R('(ii) The COA has been issued with MTI acquiescence and is "effectively the only '
  +'way for Prekka companies to clinch business deals in Singapore" — this transforms '
  +'a voluntary body\'s decision into one with quasi-governmental coercive effect '
  +'(analogous to '),CL('Datafin'),R(' — the takeover panel\'s decisions were '
  +'backed by statutory rules effectively making compliance compulsory).')),
pi(R('(iii) The SPCC liaises with and influences government policy on trade — it exercises '
  +'a function that, absent the SPCC, would need statutory regulation to fulfil.')),
amberBox([
  lbl('EVALUATIVE — Against amenability: Is SPCC truly analogous to Datafin?','C55A11'),
  bl(AMB('The examiner notes most scripts recognised amenability. But the counter-argument '
    +'is real: in '),CL('Datafin'),AMB(', the Panel derived its authority from statutory '
    +'rules (City Code underpinned by Companies Act) and refusal to comply would have '
    +'triggered statutory consequences. SPCC\'s COA has "no legal effect" per the facts. '
    +'A body whose decisions are merely '),I('de facto'),AMB(' necessary (commercial reality) '
    +'rather than '),I('de jure'),AMB(' necessary may fall outside Datafin.')),
  bl(AMB('Better view: The "no legal effect" of the COA does not determine amenability. '
    +'Datafin asks about the '),I('source of power'),AMB(' and whether the body would '
    +'need to be replaced by a statutory body if it ceased to exist. '
    +'MTI\'s acquiescence integrates SPCC into the governmental framework sufficiently '
    +'to engage judicial review. The Lawrence Khong decision supports this: '
    +'a body need not have statutory backing if it exercises effectively monopolistic '
    +'regulatory power in a domain that government has chosen to co-regulate.')),
  bl(AMBB('Impact if non-amenable: '),AMB('Grabbu cannot judicially review the SPCC decision '
    +'— it can only challenge the Minister\'s decision. This makes the second decision '
    +'analysis even more critical. Advise client on this risk.')),
]),
SP(),

H3('Ground 1B — Errors of Fact / Jurisdictional Error: Oz Warren\'s Status'),
p(B('This is the single most important factual error in the SPCC\'s decision.'),
  R(' The SPCC rejected the COA on two grounds: (a) Oz Warren\'s offer of free Sailor Smith '
  +'tickets constitutes Corruption under s 3; and (b) Oz Warren being a Prekka legislator '
  +'might bring foreign influence. Both grounds are vitiated by a fundamental factual error: '
  +'Oz Warren is a '),B('former'),R(' member of the Prekka legislature "until he lost '
  +'in the 2020 general elections." He is NOT a current legislator.')),
p(R('Corruption under s 3 requires "any Singaporean public officer\'s performance." '
  +'The Act defines "public officer" as "a Minister of Government, a legislator, or a '
  +'public servant of the relevant State." A '),B('former'),R(' legislator is not '
  +'a current "legislator" within the statutory definition — the present tense in the '
  +'definition requires current status. Per '),
  CL('Khawaja v Secretary of State for the Home Department'),R(' [1984] (UK HL) and '
  +'the Singapore approach in '),CL('Stansfield Business International'),R(': '
  +'where the exercise of a power depends on a '),B('jurisdictional precedent fact'),R(' — '
  +'an objective fact that must actually exist — the court may review whether that fact '
  +'was present. Here: whether Oz Warren is a "public officer" is a precedent '
  +'jurisdictional fact. He is NOT currently a legislator; the finding of corruption '
  +'is therefore founded on a false factual premise.')),
amberBox([
  lbl('EVALUATIVE — Can SPCC\'s foreign influence concern still justify rejection?','C55A11'),
  bl(AMB('The examiner specifically notes that Oz Warren being a FORMER legislator '
    +'does not necessarily eliminate the SPCC\'s concern about foreign interference '
    +'in Singapore politics. SPCC may argue: even as a former legislator, Oz Warren '
    +'retains significant political connections and influence in Prekka. '
    +'The SPCC\'s concern about "foreign political interference" may rationally survive '
    +'the correction of the "current legislator" error.')),
  bl(AMB('Counter: A body cannot rely on a reason it did not actually give at the time '
    +'of decision ('),CL('R v Westminster City Council, ex p Ermakov'),AMB(') — '
    +'if SPCC\'s stated reason was that Oz Warren IS a legislator (present tense), '
    +'the discovery that he is a former legislator cannot be retroactively substituted '
    +'with a different, broader concern about "former political connections." '
    +'The original stated reason is factually wrong; any new reason requires '
    +'fresh consideration.')),
]),
SP(),

H3('Ground 1C — Procedural Impropriety: Apparent Bias (Competitor Panellists)'),
p(R('Two of the three SPCC panel members are '),B('Grabbu\'s key competitors'),R('. '
  +'This is a textbook case of apparent bias. Apply the test from '),
  CL('Re Shankar Alan s/o Anant Kulkarni'),R(' [2007]; '),CL('BOI v BOJ'),R(' [2018]: '
  +'a fair-minded reasonable observer, knowing that two of the three decision-makers '
  +'had a direct commercial interest in the rejection of Grabbu\'s application '
  +'(Grabbu\'s failure in the market benefits them), would reasonably apprehend bias. '
  +'Indeed, this is arguably actual rather than merely apparent bias.')),
p(R('The examiner specifically confirmed this ground: "apparent bias (Bob Ong probably '
  +'being the politician embarrassed by Gamestonk\'s North Coast Plan game)" — the same '
  +'reasoning applies with even greater force here where the panellists are direct '
  +'commercial competitors with a financial stake in Grabbu\'s failure.')),

H3('Ground 1D — Procedural Impropriety: Denial of Fair Hearing'),
p(R('During the hearing, Oz Warren was "continuously interrupted by the Panel" and '
  +'could not complete his explanation. Per '),CL('R v Deputy Industrial Injuries Commissioner'),
  R(' and '),CL('Mahon v Air New Zealand'),R(' [1984] (PC): the right to a fair hearing '
  +'includes the right to present one\'s case without undue interference. Continuous '
  +'interruption preventing the applicant from presenting their case is a denial of '
  +'the audi alteram partem rule. Additionally: Oz Warren was not told the meeting '
  +'was an "inquisitorial hearing" — he expected a discussion of the COA application. '
  +'This element of ambush/surprise also supports procedural impropriety (per '),
  CL('Chiu Teng @ Kallang'),R(' — notice of the nature of proceedings is required).')),

H3('Ground 1E — Necessity Doctrine: Not Available to SPCC'),
p(R('Even if SPCC argued the necessity doctrine to save the biased decision (i.e., '
  +'no other panellists were available), the examiner confirmed this fails: '
  +'"the defence of necessity against an allegation of apparent bias was not '
  +'available to a non-statutory body like the SPCC." Unlike statutory tribunals '
  +'where a quorum requirement may make necessity applicable, a self-regulatory body '
  +'like SPCC can simply reconstitute its panel differently. There is no necessity here.')),

H3('Ground 1F — Irrationality of $50m Revenue Policy'),
p(R('SPCC\'s policy requires companies to demonstrate at least $50m revenue in the first '
  +'year of operations. The examiner notes this "might be said to be so manifestly '
  +'disproportionate that it might be irrational." For a start-up entering a new market, '
  +'a $50m first-year revenue threshold is an almost impossibly high bar — it would '
  +'exclude virtually all genuine start-ups while protecting incumbents. This policy '
  +'arguably has '),B('no rational connection'),R(' to the stated objective of '
  +'"substantially furthering Singapore\'s economic and public interests" — '
  +'it achieves the opposite by excluding innovative companies at the entry stage. '
  +'Per '),CL('GCHQ'),R(' — a threshold so high as to be effectively exclusionary '
  +'may be irrational.')),

H2('DECISION 2: Minister of Trade\'s Termination Order'),

H3('Ground 2A — Jurisdictional Precedent Fact Error: Oz Warren Not a "Foreign Public Officer"'),
p(B('This is the critical ground for Decision 2.'),R(' Section 5 empowers the Minister '
  +'to order suspension where the Minister is satisfied a corporation has breached s 4 '
  +'by failing to declare shareholding by a '),B('"foreign public officer"'),R('. '
  +'Section 2 defines "public officer" as a Minister, legislator, or public servant '
  +'of the relevant State. As established above: Oz Warren is a '),B('former'),R(' '
  +'member of the Prekka legislature — not a current legislator. He is not a '
  +'"foreign public officer" within the statutory definition. The Minister\'s '
  +'power to order suspension under s 5 is contingent on this precedent fact '
  +'actually being met. It is not met. The Minister has acted '),
  B('without jurisdiction'),R('.')),
p(R('Per '),CL('Stansfield Business International Pte Ltd v Minister for Manpower'),R(': '
  +'where a decision depends on a precedent jurisdictional fact, the court '
  +'reviews that fact on the merits — not on a reasonableness or Wednesbury standard. '
  +'The finding that Oz Warren is a "foreign public officer" is objectively wrong; '
  +'the Minister\'s order is therefore void.')),

H3('Ground 2B — Ultra Vires: Order to "Terminate" vs Power to "Suspend"'),
p(R('Section 5 grants the Minister power to "require the corporation to '),
  B('suspend its operations for one year'),R('." The Minister\'s letter states: '
  +'"I hereby '),B('terminate'),R(' Grabbu\'s operations in Singapore." Termination '
  +'and suspension are fundamentally different. A one-year suspension is temporary; '
  +'termination is permanent. The Minister has exercised a power that the statute '
  +'does not grant. This is '),B('ultra vires'),R(' — the Minister has gone beyond '
  +'the scope of the authority Parliament conferred.')),

H3('Ground 2C — Abrogation of Discretion / Irrelevant Consideration'),
p(R('The Minister\'s order states he acted "Based on the SPCC\'s report on the COA '
  +'application." This demonstrates the Minister simply adopted the SPCC\'s decision '
  +'without any independent analysis. Per '),CL('Komoco Motors Pte Ltd v Registrar '
  +'of Vehicles'),R(' [2008] (CA): a decision-maker must exercise their statutory '
  +'discretion personally and independently. Simply rubber-stamping another body\'s '
  +'decision — especially one already vitiated by errors — is an unlawful abrogation '
  +'of discretion.')),

H3('Ground 2D — Ouster Clause: Section 6 ("The Minister\'s Decision Under Section 5 is Final")'),
p(R('Same analysis as in the Gamestonk paper: per '),CL('Nagaenthran'),R(', the finality '
  +'clause in s 6 cannot protect a decision made outside jurisdiction. Since the '
  +'Minister\'s order is ultra vires (wrong basis — precedent fact error; wrong remedy — '
  +'termination vs suspension), the decision is void ab initio and s 6 cannot save it.')),

purpBox([
  lbl('★  STRATEGIC ADVICE (Purple) — Grabbu: Priorities and Remedies','7030A0'),
  bl(PRPB('LEAD WITH DECISION 2 ULTRA VIRES GROUNDS:'),PRP(' The two knock-out punches are: '
    +'(1) Oz Warren is a FORMER legislator — Minister has no s 5 jurisdiction; '
    +'(2) Minister ordered termination, not suspension — ultra vires the statutory power. '
    +'These are quick wins that should be argued first and with maximum clarity.')),
  bl(PRPB('REMEDY — DECISION 2:'),
    PRP(' (1) '),PRPB('Quashing order:'),PRP(' Quash the Ministerial termination order — '
    +'ultra vires (precedent fact error; exceeded statutory power). This is the most '
    +'urgent remedy as it directly prevents Grabbu from having to cease operations.')),
  bli(PRP('(2) '),PRPB('Prohibiting order:'),PRP(' Seek an interim prohibitory order '
    +'preventing the Minister from enforcing the termination order while judicial '
    +'review proceedings are pending. This is critical — Grabbu\'s entire Singapore '
    +'operation is at stake.')),
  bli(PRP('(3) '),PRPB('Declaratory order:'),PRP(' Declare that even if s 5 were lawfully '
    +'invoked, the maximum remedy would be suspension for one year — not permanent '
    +'termination. Narrowing any future exercise of the s 5 power.')),
  bl(PRPB('REMEDY — DECISION 1 (SPCC COA):'),
    PRP(' (1) If SPCC is amenable: '),PRPB('quashing order'),PRP(' to quash the rejection '
    +'of the third COA application — bias, denial of fair hearing, factual error '
    +'on Oz Warren\'s status. Then seek a '),PRPB('mandatory order'),PRP(' to compel '
    +'reconsideration (not to compel grant — courts are reluctant to substitute '
    +'their judgment for the body\'s). Examiner: "Grabbu might wish to seek a mandatory '
    +'order to compel the SPCC to grant it the Certificate, although the likelihood '
    +'of obtaining it would be extremely low."')),
  bli(PRP('(2) If SPCC is NOT amenable to JR: ensure Decision 1 defects are argued '
    +'through Decision 2 — e.g., the Minister abrogated discretion by relying entirely '
    +'on the flawed SPCC report. Attacking the SPCC report\'s factual errors '
    +'indirectly vitiates the Minister\'s decision.')),
  bl(PRPB('SLE ARGUMENT — ADDITIONAL:'),PRP(' Yam Seng communicated the SPCC\'s policy '
    +'criteria to Oz Warren. This may give rise to a legitimate expectation that '
    +'Grabbu would be assessed on those criteria (compliance with GCPA; $50m revenue). '
    +'Per '),CL('Chiu Teng'),PRP(', the representation must be clear and unambiguous. '
    +'Yam Seng\'s communication appears sufficiently specific. However, examiner '
    +'notes "the requisite test (even without the Tan Seng Kee gloss) would likely '
    +'not be satisfied" — pursue as an alternative ground only.')),
]),

// ═══════════════════════════════════════════════════════════════════════════
PB(),
H1('AY2022-23  Q1 — GERRY LEE / SBA'),
// ═══════════════════════════════════════════════════════════════════════════
p(B('Fact overview: '), R('Gerry Lee, a radio presenter and SBA member with a 10-year licence, '
  +'was called to an unexpected "discussion" that turned into a disciplinary tribunal. '
  +'His licence was revoked and he was blacklisted. He then applied directly to the MDBC '
  +'for a new licence; this was rejected on political and embarrassment grounds. '
  +'Two decisions require analysis.')),

pinkBox([
  lbl('Examiner Feedback — AY2022-23 Q1','9B1F6E'),
  bl(R('✓ Best scripts: identified at least 9-10 factual patterns forming different grounds; '
    +'clearly stated relevant rules and cases; analogised or distinguished Hypo facts '
    +'to existing case law; reached clear conclusions on recourse.')),
  bl(R('✓ Specifically noted: recognising/drawing analogies to '),CL('Datafin'),
    R(' (and Lawrence Khong) for SBA amenability; '
    +'noting SBA Chairman\'s position creates bias; '
    +'identifying the '),B('patent irrationality'),R(' of the requirement for a diploma '
    +'in audio equipment repair for a radio presenter.')),
  bl(REDB('✗ Poorer scripts: '),RED('identified issues but gave cursory analysis; '
    +'slavishly matched facts to existing case law without engaging legal principles; '
    +'serious errors in stating case law (especially on the three types of bias); '
    +'meekly concluding irrationality standard is too high without careful analysis; '
    +'failing to engage with the SBA Chairman\'s fettering of discretion.')),
  bl(REDB('✗ Missed issues: '),RED('SBA members said "we were largely in agreement about '
    +'Gerry\'s actions when we talked yesterday" — clear pre-determination; '
    +'requirement (3) (diploma in audio equipment repair) is manifestly irrational '
    +'and ultra vires the Broadcasting Act\'s purpose.')),
]),
SP(),

H2('PRELIMINARY: Structure of Advice — Two Decisions'),
blueBox([
  lbl('Issue map','1F4E79'),
  bl(B('Decision 1:'), R(' SBA disciplinary tribunal decision — revocation of licence + blacklisting')),
  bl(B('Decision 2:'), R(' MDBC Minister\'s rejection of Gerry\'s direct licence application')),
  bl(B('Preliminary note on Decision 1:'), R(' SBA amenability is contested (Datafin). '
    +'This must be resolved before any substantive grounds can be argued for Decision 1.')),
]),
SP(),

H2('DECISION 1: SBA Tribunal Revocation and Blacklisting'),

H3('Ground 1A — Amenability to Judicial Review (SBA)'),
p(R('The SBA is a self-regulatory body established by five radio channels — not a statutory '
  +'authority. Apply '),CL('Datafin'),R(' nature test (endorsed in Singapore in '),
  CL('Lawrence Khong Kin Hoong v Singapore Athletic Federation'),R('):')),
p(R(B('Arguments for amenability:')),
  R(' (i) The SBA Code of Conduct is "regularly updated in consultation with the MDBC" — '
  +'statutory integration into the governmental regulatory framework. (ii) SBA membership '
  +'confers automatic MDBC approval; non-members must apply separately through the SBA '
  +'for a recommendation before MDBC approval — the SBA therefore acts as a '),
  B('gatekeeping function'),R(' in what is otherwise a statutory licensing regime. '
  +'(iii) Absent the SBA, the MDBC would need to perform this screening function '
  +'itself — the SBA substitutes for a public function. (iv) 95% of radio presenters '
  +'are SBA members — near-monopolistic regulatory effect in the broadcasting market '
  +'(cf. '),CL('Datafin'),R(' — "effectively compulsory" to comply).')),
amberBox([
  lbl('EVALUATIVE — Against amenability: Datafin source of power test','C55A11'),
  bl(AMB('The examiner specifically noted the Lawrence Khong analogy. In '),
    CL('Lawrence Khong'),AMB(', the Singapore Athletic Federation was NOT amenable '
    +'because its authority derived entirely from contract (membership agreement), '
    +'not from any governmental framework. Per Lord Donaldson in '),CL('Datafin'),AMB(': '
    +'a body is not amenable merely because it has a public effect. The source of power '
    +'must be governmental or underpinned by statute.')),
  bl(AMB('Better view for Gerry: The SBA\'s decision carries quasi-governmental consequences — '
    +'revocation by the SBA directly affects Gerry\'s MDBC licence status and broadcasting '
    +'career. The MDBC\'s acquiescence in treating SBA membership as conferring '
    +'automatic approval integrates the SBA into the statutory licensing scheme '
    +'sufficiently to make it amenable. This is closer to '),CL('Datafin'),AMB(' than '
    +'Lawrence Khong because the statutory scheme (Broadcasting Act) creates the '
    +'framework within which the SBA operates.')),
  bl(AMB(AMBB('Strategic implication: '),AMB('If SBA is non-amenable, Gerry must focus '
    +'entirely on Decision 2 (MDBC). Advise accordingly. Even if SBA is non-amenable, '
    +'the MDBC decision is independently challengeable and there are strong grounds '
    +'there — including grounds flowing from the SBA\'s procedurally defective process '
    +'(the MDBC adopted the SBA\'s conclusion in making its decision).'))),
]),
SP(),

H3('Ground 1B — Pre-Determination (Actual Bias)'),
p(R('Three departing SBA board members explicitly stated: '),
  B('"We were largely in agreement about Gerry\'s actions when we talked yesterday."'),
  R(' This is '),B('pre-determination'),R(' — the board members had already reached '
  +'a conclusion before Gerry was heard. Per '),CL('R v Sussex Justices, ex p McCarthy'),
  R(' [1924]: "justice must not only be done, but must be manifestly and undoubtedly '
  +'be seen to be done." The statement reveals actual pre-judgment — not merely '
  +'appearance of bias but actual bias through pre-formed views expressed before '
  +'the close of the proceedings. This is the '),B('strongest bias ground'),R('.')),

H3('Ground 1C — Procedural Bias: SBA Chairman Acting on Minister\'s Instruction'),
p(R('The Health Minister called the SBA Chairman directly at lunchtime and said Gerry '
  +'"should be disciplined for his comments." The SBA Chairman then immediately emailed '
  +'Gerry requesting his attendance. This creates a direct line of causation between '
  +'political pressure and disciplinary action. Per the '),
  CL('apparent bias test'),R(' in '),CL('Re Shankar Alan'),R(': a reasonable observer '
  +'knowing that the SBA Chairman received direct political instruction to "discipline" '
  +'Gerry, and then constituted a tribunal that disciplined him on that same day, '
  +'would reasonably suspect that the Chairman\'s decision was the product of external '
  +'political pressure rather than independent adjudication. This is textbook apparent bias '
  +'operating at the constitutional level (executive interference with quasi-judicial function).')),

H3('Ground 1D — Procedural Impropriety: No Notice of Disciplinary Proceedings'),
p(R('Gerry was told he was attending a "brief discussion with a few SBA colleagues" — '
  +'not that he was facing a formal disciplinary tribunal with the power to revoke his licence '
  +'and blacklist him. Per '),CL('Dunlop v Woollahra Municipal Council'),R(' [1982] (PC) '
  +'and '),CL('Ho Paul v Singapore Medical Council'),R(': notice of the nature, grounds, '
  +'and consequences of proceedings is a fundamental requirement of procedural fairness. '
  +'Gerry was '),B('"shocked"'),R(' to find himself before a disciplinary tribunal — '
  +'this is precisely the ambush-style procedure that procedural impropriety is designed '
  +'to prevent. He could not prepare his case or obtain legal representation.')),

H3('Ground 1E — Procedural Impropriety: SBA Chairman\'s Dominance / Quorum Issues'),
p(R('The SBA Chairman: (i) "quizzed Gerry about how he selected content" — not about the '
  +'impugned comments; (ii) monopolised questioning for four hours; (iii) refused to let '
  +'co-panellists speak meaningfully. Per '),CL('Chiam See Tong v Singapore Democratic Party'),
  R(': a fair hearing requires the decision-maker to maintain an open mind throughout '
  +'and allow the affected party a genuine opportunity to address the case against them. '
  +'Four hours of questioning dominated by the Chairman — with other members "tapping '
  +'on their phones" — is not a genuine hearing.')),
p(R('Additionally, three of the five board members physically left the proceedings at noon '
  +'and delegated their vote to the Chairman: '),
  B('"We shall agree with whatever you decide."'),R(' This raises a '),
  B('quorum and delegation issue'),R(': the remaining two members purported to make a '
  +'binding decision affecting a five-member tribunal. Whether the SBA\'s own rules '
  +'permitted this delegation is a factual question, but it raises serious procedural concerns.')),
amberBox([
  lbl('EVALUATIVE — Does the questioning about irrelevant topics vitiate the hearing?','C55A11'),
  bl(AMB('The SBA Chairman spent four hours asking Gerry about content selection, tennis '
    +'events, and sport-health correlations — ostensibly the very substance of his '
    +'talkshow. But the alleged disciplinary trigger was Gerry\'s comments about '
    +'government vaccination policy. The Chairman\'s questioning did not address the '
    +'impugned comments at all — meaning Gerry was never given an opportunity to '
    +'respond to the actual case against him.')),
  bl(AMB('Per '),CL('R v Secretary of State, ex p Doody'),AMB(' [1994] (UK HL): '
    +'the right to be heard on the case against you requires the applicant to know '
    +'the case they face and to respond to it. Gerry was questioned extensively '
    +'on irrelevant matters and never informed of the specific charge or given '
    +'an opportunity to address it. This is a fundamental denial of audi alteram partem.')),
]),
SP(),

H3('Ground 1F — No Reasons Given'),
p(R('The SBA Chairman stated Gerry was "not entitled to reasons for this decision." '
  +'While Singapore has no '),I('general'),R(' duty to give reasons for administrative '
  +'decisions ('),CL('Manjit Singh s/o Kirpal Singh v AG'),R('), per '),
  CL('R v Civil Service Appeal Board, ex p Cunningham'),R(' [1991] and '),
  CL('Stefan v General Medical Council'),R(' — where: (i) the consequences are serious '
  +'(loss of livelihood); (ii) there is a right to know the case against you; and '
  +'(iii) the affected party needs reasons to consider whether to challenge the decision '
  +'— failure to give reasons is itself a form of procedural impropriety.')),

H3('Ground 1G — Irrationality of Penalty: Blacklisting'),
p(R('The decision to simultaneously revoke Gerry\'s licence AND blacklist him (barring any '
  +'future association with the SBA) for comments made on a radio show is grossly '
  +'disproportionate to any conceivable regulatory objective of the SBA. '
  +'The SBA\'s stated purpose is "to ensure responsible radio broadcasting" — not '
  +'to permanently exclude broadcasters from the industry for expressing political views '
  +'protected by Art 14. Per '),CL('GCHQ'),R(': the penalty is so disproportionate '
  +'as to be irrational. Additionally: "We have a tennis club buddy ready to replace '
  +'him" — stated by departing board members — suggests the decision was influenced '
  +'by motives of replacement rather than genuine regulatory concern.')),

H2('DECISION 2: MDBC Minister\'s Rejection of Gerry\'s Licence Application'),
p(R('Gerry submitted a direct application to the MDBC. The Minister rejected it giving '
  +'two stated reasons: (1) Gerry\'s vaccination views are "contrary to Singapore\'s '
  +'national interest" (on Health Minister\'s advice); and (2) Gerry\'s talkshow is '
  +'"insignificant" and licensing him "would be embarrassing to the SBA and MDBC" '
  +'(on SBA Chairman\'s advice).')),

H3('Ground 2A — Illegality: Diploma in Audio Equipment Repair (Requirement 3)'),
p(R('The MDBC\'s published policy requires applicants to have: (1) 5+ years radio hosting '
  +'experience; (2) ability to speak three official languages; and (3) a '),
  B('diploma in audio equipment repair'),R('. Gerry meets (1) and (2) — he has '
  +'10 years of experience. He does not hold (3).')),
p(R('Requirement (3) is '),B('ultra vires the Broadcasting Act 1994'),R('. The Act '
  +'empowers the Minister to "grant licences to persons with the requisite professional '
  +'broadcasting competences." A diploma in audio equipment repair has no discernible '
  +'connection to professional broadcasting competence — a radio presenter does not '
  +'need to repair audio equipment. This is a requirement without rational connection '
  +'to the statutory purpose of licensing broadcasting professionals, and therefore '
  +'falls outside the scope of the Minister\'s licensing power.')),
amberBox([
  lbl('EVALUATIVE — Could Requirement (3) be justified as a legitimate competence criterion?','C55A11'),
  bl(AMB('The Government may argue that some technical knowledge of broadcasting equipment '
    +'is part of "professional broadcasting competence." But this stretches the phrase '
    +'beyond recognition: a radio talk show presenter\'s competence is assessed by '
    +'communication skills, content judgment, audience engagement — not mechanical '
    +'equipment maintenance. The examiner specifically called this out as a "patent '
    +'error" issue analogous to the AY2020-21 question. It should be characterised '
    +'as both ultra vires AND irrational.')),
  bl(AMB('Additionally: If Requirement (3) is ultra vires, it cannot lawfully form part '
    +'of the criteria for assessment. The Minister cannot reject Gerry\'s application '
    +'on the basis of a criterion that is itself unlawful. Per '),
    CL('R v Monopolies and Mergers Commission, ex p South Yorkshire Transport Ltd'),
    AMB(' — decisions based on unlawful policy criteria are themselves unlawful.')),
]),
SP(),

H3('Ground 2B — Improper Purpose / Irrelevant Considerations'),
p(R(B('Reason 1 — Vaccination views "contrary to national interest":'),R(' The '
  +'Broadcasting Act empowers the Minister to license broadcasting professionals. '
  +'Licensing criteria must relate to "professional broadcasting competences" (s 3(1)). '
  +'Whether a licensee holds particular political/public health views — however '
  +'controversial — is not a criterion for broadcasting competence. Taking into account '
  +'the applicant\'s political views (received "on the Minister of Health\'s advice") '
  +'is an '),B('irrelevant consideration'),R(' that renders the decision unlawful.'))),
pi(R('Per '),CL('Padfield v Minister of Agriculture'),R(' [1968]: discretionary '
  +'power must be exercised consistently with the statutory purpose. The statutory '
  +'purpose of the Broadcasting Act is to regulate broadcasting services — not '
  +'to enforce adherence to government health policy positions. '
  +'Per '),CL('Wheeler v Leicester City Council'),R(' [1985] (UK CA): '
  +'penalising a party for exercising a legal right (expressing political views '
  +'on a public issue) through the exercise of unrelated statutory power '
  +'constitutes improper purpose.')),
p(R(B('Reason 2 — "Embarrassing to the SBA and MDBC":'),R(' This is an even more '
  +'egregious irrelevant consideration. Avoiding embarrassment to a self-regulatory '
  +'body is not among the statutory purposes of the Broadcasting Act. '
  +'It is a consideration of institutional face-saving, not of public interest '
  +'or broadcasting quality. The examiner notes this as a relevant ground to flag: '
  +'taking the SBA Chairman\'s views into account about Gerry\'s "significance" '
  +'is both an irrelevant consideration AND evidence of fettering of discretion '
  +'(see below).')),

H3('Ground 2C — Fettering of Discretion: Acting on Advice of Health Minister and SBA Chairman'),
p(R('The Minister made his decision: (1) "on the Minister of Health\'s advice" — not '
  +'on his own assessment of broadcasting competence; and (2) "having consulted '
  +'the SBA Chairman" — not on an independent evaluation of Gerry\'s talkshow\'s merits. '
  +'Per '),CL('Komoco Motors'),R(': the decision-maker must exercise the statutory '
  +'discretion personally. Delegating the substantive assessment to external advisors '
  +'who have their own interests (Health Minister: enforce vaccination message; '
  +'SBA Chairman: who is personally implicated in Gerry\'s case) '
  +'is a '),B('textbook abrogation of discretion'),R('.')),

H3('Ground 2D — Substantive Legitimate Expectation'),
p(R('Gerry had held an SBA-approved licence for 10 years without issue. '
  +'The MDBC\'s own published criteria set the requirements for grant of a licence. '
  +'Gerry satisfies requirements (1) and (2). He could only be denied on requirement (3) — '
  +'which is itself unlawful. He therefore has a substantive legitimate expectation '
  +'of receiving a licence on satisfying the lawful criteria.')),
p(R('Per '),CL('Chiu Teng'),R(': the MDBC policy on its website constitutes a sufficiently '
  +'clear and specific representation that licences will be granted to those meeting '
  +'the criteria. The refusal on political grounds (vaccination views) and embarrassment '
  +'grounds is '),B('manifestly inconsistent with the published criteria'),R(' — '
  +'it substitutes unlawful criteria for the lawful ones. The SLE is breached.')),

H3('Ground 2E — Finality Clause in "Appeal" Provision'),
p(R('The MDBC\'s response stated "no further appeal was available." This is a finality '
  +'clause on the Minister\'s decision. Apply '),CL('Nagaenthran'),R(': the finality '
  +'clause cannot oust judicial review for ultra vires action. The decision to reject '
  +'on improper grounds (political views; embarrassment) is ultra vires — the finality '
  +'clause provides no protection.')),

purpBox([
  lbl('★  STRATEGIC ADVICE (Purple) — Gerry Lee: Priorities and Remedies','7030A0'),
  bl(PRPB('PRIORITISATION — LEAD WITH DECISION 2:'),PRP(' Decision 2 (MDBC rejection) '
    +'has the clearest grounds with the strongest legal footing — three stated reasons '
    +'are all independently unlawful, and the SBA amenability issue does NOT arise '
    +'for Decision 2. Argue Decision 2 fully and clearly. Then address Decision 1 '
    +'subject to the Datafin amenability threshold.')),
  bl(PRPB('REMEDY — DECISION 2:')),
  bli(PRP('(1) '),PRPB('Quashing order:'),PRP(' Quash the MDBC rejection — improper purpose '
    +'(vaccination views; embarrassment); irrelevant considerations; fettering '
    +'of discretion. This is the primary remedy.')),
  bli(PRP('(2) '),PRPB('Mandatory order:'),PRP(' Compel the Minister to reconsider '
    +'Gerry\'s application lawfully — i.e., on lawful criteria only (competence-based) '
    +'and without reference to vaccination views or SBA preferences. '
    +'The audio equipment diploma requirement (Requirement 3) must be treated as '
    +'void — Gerry cannot be assessed against an ultra vires criterion.')),
  bli(PRP('(3) '),PRPB('Declaratory order:'),PRP(' Declare that Requirement (3) '
    +'(diploma in audio equipment repair) is ultra vires the Broadcasting Act '
    +'and cannot form part of the MDBC licensing criteria.')),
  bli(PRP('(4) '),PRPB('Interim prohibiting order:'),PRP(' Prevent the MDBC from licensing '
    +'a replacement presenter for "93.9FM Mad-For-Tennis" pending resolution — '
    +'the SBA Chairman\'s statement about a "tennis club buddy" ready to replace '
    +'Gerry indicates an imminent irreversible step.')),
  bl(PRPB('REMEDY — DECISION 1 (if SBA amenable):')),
  bli(PRP('(1) '),PRPB('Quashing order:'),PRP(' Quash the tribunal decision — pre-determination '
    +'(board members discussed case the previous day); apparent bias (SBA Chairman '
    +'acting on political instruction); no notice of disciplinary proceedings; '
    +'denial of fair hearing on the actual charge. Seek to quash both the licence '
    +'revocation AND the blacklisting separately.')),
  bli(PRP('(2) '),PRPB('Mandatory order:'),PRP(' Compel the SBA to conduct a fresh, '
    +'lawful hearing with an unbiased panel properly constituted, with adequate '
    +'notice and opportunity to address the actual charge.')),
  bl(PRPB('TACTICAL ARGUMENT — CONNECTING DECISION 1 AND 2:'),PRP(' Even if the SBA '
    +'is held non-amenable, use Decision 1\'s procedural defects to undermine '
    +'Decision 2. The MDBC Minister "consulted the SBA Chairman" — the same Chairman '
    +'who was politically pressured by the Health Minister and who ran a procedurally '
    +'defective tribunal. Reliance on the SBA Chairman\'s assessment as a basis '
    +'for the MDBC decision independently constitutes fettering of discretion '
    +'and reliance on a tainted source. Even without quashing Decision 1, '
    +'the Minister\'s Decision 2 cannot lawfully rely on the SBA Chairman\'s '
    +'assessment given his obvious conflict of interest and improper conduct '
    +'in the SBA proceedings.')),
]),

// ── END ─────────────────────────────────────────────────────────────────────
HR(),
p(B('END OF MODEL ANSWERS — Admin Law Q1: AY2024-25 | AY2023-24 | AY2022-23')),
p(R('Colour key: Black = main argument  |  '),
  new TextRun({text:'Purple',font:'Arial',size:22,color:'7030A0',bold:true}),
  R(' = strategic/remedies  |  '),
  new TextRun({text:'Amber',font:'Arial',size:22,color:'C55A11',bold:true}),
  R(' = evaluative turning points  |  '),
  new TextRun({text:'Blue italic',font:'Arial',size:22,color:'1F4E79',italics:true}),
  R(' = case citations')),
];

// ── BUILD DOCUMENT ───────────────────────────────────────────────────────────
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
    properties:{page:{
      size:{width:12240,height:15840},
      margin:{top:1080,right:1080,bottom:1080,left:1080}
    }},
    children
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('/home/claude/CAAL_AdminLaw_ModelAnswers.docx', buf);
  console.log('Done!');
}).catch(e => { console.error(e); process.exit(1); });
