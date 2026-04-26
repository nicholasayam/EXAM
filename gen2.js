const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  BorderStyle, WidthType, ShadingType,
  Table, TableRow, TableCell, PageBreak
} = require('docx');
const fs = require('fs');

// ── colour / run helpers ────────────────────────────────────────────────────
const R  = (t,o={}) => new TextRun({text:t, font:'Arial', size:22, ...o});
const B  = (t,o={}) => R(t,{bold:true,...o});
const I  = (t,o={}) => R(t,{italics:true,...o});
const BI = (t,o={}) => R(t,{bold:true,italics:true,...o});

// Purple = strategic / remedies
const PRP  = (t,o={}) => R(t,{color:'7030A0',...o});
const PRPB = (t,o={}) => R(t,{color:'7030A0',bold:true,...o});

// Amber = evaluative turning points
const AMB  = (t,o={}) => R(t,{color:'C55A11',...o});
const AMBB = (t,o={}) => R(t,{color:'C55A11',bold:true,...o});

// Case law blue
const CL   = (t,o={}) => R(t,{color:'1F4E79',italics:true,...o});
const CLB  = (t,o={}) => R(t,{color:'1F4E79',bold:true,...o});

// Red for warnings
const RED  = (t,o={}) => R(t,{color:'C00000',...o});
const REDB = (t,o={}) => R(t,{color:'C00000',bold:true,...o});

// paragraph factories
const p   = (...r) => new Paragraph({children:r, spacing:{after:140}});
const pi  = (...r) => new Paragraph({children:r, spacing:{after:110}, indent:{left:480}});
const pii = (...r) => new Paragraph({children:r, spacing:{after:90},  indent:{left:960}});
const SP  = ()     => new Paragraph({children:[R('')], spacing:{after:100}});
const PB  = ()     => new Paragraph({children:[new PageBreak()]});
const HR  = ()     => new Paragraph({
  border:{bottom:{style:BorderStyle.SINGLE,size:6,color:'ADB9CA'}},
  spacing:{after:160,before:80}, children:[]
});

// heading factories
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
  children:[new TextRun({text:t, font:'Arial', size:22, bold:true, color:'4A235A'})],
  spacing:{before:140,after:80}
});

// coloured box builder
const mkBox = (bg, accent, children) => new Table({
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
    children
  })]})],
});

const pinkBox  = cs => mkBox('FDE8F4','9B1F6E',cs);
const purpBox  = cs => mkBox('F0E6FF','7030A0',cs);
const amberBox = cs => mkBox('FFF3E0','C55A11',cs);
const blueBox  = cs => mkBox('EBF5FB','1F4E79',cs);

const lbl = (t,c='1A1A2E') => new Paragraph({
  children:[new TextRun({text:t, font:'Arial', size:21, bold:true, color:c})],
  spacing:{after:60}
});
const bl  = (...r) => new Paragraph({children:r, spacing:{after:80}});
const bli = (...r) => new Paragraph({children:r, spacing:{after:80}, indent:{left:360}});

// ═══════════════════════════════════════════════════════════════════════════
const children = [

// ── COVER ──────────────────────────────────────────────────────────────────
H1('CAAL Constitutional Law — Model Answers'),
p(B('Papers: '),R('AY2020–21 (Q3, Q5)  |  AY2022–23 (Q3, Q5)')),
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
H1('AY2020–21  SECTION B'),
// ═══════════════════════════════════════════════════════════════════════════

// ── Q3 ─────────────────────────────────────────────────────────────────────
PB(),
H1('AY2020–21  Q3 — Tudung / Art 15 & Art 12 Legal Opinion'),

H2('Question'),
p(R('You are a Ministry of Law officer. Draft a legal opinion on the possible constitutional issues that '
  +'Shamsiah\'s case may raise, and assess whether the courts are likely to uphold government policy '
  +'restricting the wearing of the tudung by public officers and in public spaces (like schools).')),

pinkBox([
  lbl('Examiner Feedback — Q3 (AY20-21)','9B1F6E'),
  bl(R('✓ Central issues: Art 15(1) — is wearing tudung part of religious practice? Must it be '
    +'essential/central to faith (Vijaya Kumar test)? Art 15(4) — does "general law of general '
    +'application" / public order restriction legitimately justify the policy?')),
  bl(R('✓ Art 12 — inconsistency of treating Muslim women differently from Sikh men (turbans '
    +'permitted) and Sikhs riding motorcycles (helmet exemption). Apply RCT carefully.')),
  bl(R('✓ Policy is "under review" and "ongoing discussions" — this context is relevant to how '
    +'courts assess the restriction\'s legitimacy (Vijaya Kumar, Madan Mohan Singh).')),
  bl(RED('✗ Common error: Going off-topic by discussing the MRHA — NOT relevant here. The '
    +'question is a constitutional Art 15/12 analysis.')),
  bl(RED('✗ Not well done generally. Many answers strayed. The helmet exemption (Sikhs) / '
    +'kirpan issue is a key Art 12 discriminatory treatment argument to address.')),
]),
SP(),

H2('LEGAL OPINION: Constitutional Issues in the Tudung Policy'),
p(B('To:'), R(' Minister, Ministry of Law')),
p(B('Re:'), R(' Constitutional analysis — tudung policy for public officers and public spaces')),
p(B('Summary:'), R(' This Opinion analyses whether the Government\'s policy restricting Muslim women '
  +'from wearing the tudung in public service and public spaces (including schools) engages and '
  +'potentially violates Articles 15(1) and 12(1) of the Constitution. It further advises on whether '
  +'courts are likely to uphold the policy.')),

H2('I.  Preliminary: Justiciability and Shamsiah\'s Standing'),
p(R('Shamsiah is about to enter public healthcare service. Her concern that she will be asked to remove '
  +'the tudung is a credible, concrete and imminent threat to her constitutional rights. This is not a '
  +'hypothetical challenge: a prospective public servant directly subject to the policy has standing to '
  +'challenge it under O 24 r 4 Rules of Court, as her right under Art 15(1) is directly and '
  +'imminently engaged ('),CL('Tan Eng Hong v AG'),R(' — the applicant must face an actual or imminent '
  +'deprivation; a chilling effect is insufficient per '),CL('Tan Seng Kee v AG'),R(' [2022], but '
  +'Shamsiah\'s situation — facing mandatory removal of the tudung upon joining service — crosses '
  +'this threshold).')),
amberBox([
  lbl('EVALUATIVE — Is there a live constitutional question or a purely political one?','C55A11'),
  bl(R('The Government has placed the policy under "ongoing review" through "discussions with the Muslim '
    +'community." This raises a preliminary justiciability concern: is the policy sufficiently settled '
    +'and crystallised to be challenged, or is it in a state of flux that renders any Art 15 challenge '
    +'premature?')),
  bl(R('Better view: The policy is currently operative and its continued operation — even if "under '
    +'review" — restricts Shamsiah\'s rights in real time. The court should not refuse to hear the '
    +'case on justiciability grounds. However, the "ongoing review" is relevant at the merits '
    +'stage: per '),CL('Vijaya Kumar v AG'),R(' [2015] and '),CL('Madan Mohan Singh v AG'),R(', '
    +'the fact that a policy is the subject of active government review and inter-community negotiation '
    +'affects how the court assesses the proportionality/reasonableness of the restriction — '
    +'it suggests the Government itself has not formed a definitive view that the restriction is '
    +'necessary, which is probative against Art 15(4) justification.')),
]),

H2('II.  Article 15(1) — Freedom of Religion'),
H3('Step 1: What does Art 15(1) protect?'),
p(R('Art 15(1): "Every person has the right to profess and practise his religion and to propagate it." '
  +'This includes: (a) the internal dimension of belief (forum internum — fully protected, cannot be '
  +'regulated); and (b) the external dimension of manifestation of belief — the right to practise '
  +'one\'s religion — which is protected but subject to Art 15(4) restrictions.')),
p(R('The crucial prior question is whether wearing the tudung constitutes a "religious practice" '
  +'protected by Art 15(1). Two possible approaches:')),

H3('Step 2: Is the tudung a protected religious practice?'),
H4('Approach (A): Restrictive — Essentiality/Centrality Test'),
p(CL('Nappalli Peter Williams v ITE'),R(' [1999]: Court refused to engage with the substance of what '
  +'constitutes a "religious" act or what is "essential" to a religion, noting the difficulty of '
  +'courts making theological determinations. However, the court implicitly applied a test asking '
  +'whether the practice was one that a '),B('"reasonable body of [religious adherents] would '
  +'regard as enjoined by their faith."')),
p(CL('Vijaya Kumar v AG'),R(' [2015]: Court moved closer to a proportionality approach. '
  +'Rajah JA held that the court should assess whether the practice is '),B('"central or '
  +'important"'),R(' to the religion (drawing from the Indian Supreme Court\'s approach in '
  +' '),CL('Commissioner, Hindu Religious Endowments v Sri Lakshmindra Thirtha Swamiar'),R('). '
  +'The "essential religious practice" test is therefore implicitly operative in Singapore though '
  +'not labelled as such.')),
amberBox([
  lbl('EVALUATIVE — Is wearing tudung "essential" to Islam?','C55A11'),
  bl(R('There is genuine scholarly and theological disagreement. Pro-essentiality: the Quran (Surah '
    +'24:31; Surah 33:59) and major schools of Islamic jurisprudence (Shafi\'i school dominant in '
    +'Singapore) regard the hijab/tudung as obligatory for Muslim women upon reaching puberty. '
    +'Shamsiah herself states it is "an essential aspect of her faith."')),
  bl(R('Counter: Courts are reluctant to rule on theological questions. The Government may argue that '
    +'there are Muslim scholars who take more permissive positions on the tudung. However, for an '
    +'Art 15 claim, the question is not whether ALL Muslims regard the practice as essential, but '
    +'whether a '),B('reasonable, sizeable body of Muslim adherents'),R(' does — and there is '
    +'strong evidence that this standard is met.')),
  bl(R('Strategic assessment: Shamsiah should lead with expert theological/religious evidence from '
    +'credible Islamic scholars to establish that the tudung is regarded as obligatory by a '
    +'substantial body of Muslim opinion, without requiring the court to adjudicate between competing '
    +'theological views. This sidesteps the '),CL('Nappalli'),R(' concern about courts engaging '
    +'in theological determination.')),
]),
H4('Approach (B): Broader — Any Sincere Religious Belief'),
p(R('An alternative approach (adopted in some international jurisdictions, e.g., ECHR Eweida v UK) '
  +'would ask simply whether the practice manifests a sincere religious belief of the individual. '
  +'Under this approach, Shamsiah\'s own sincere personal conviction that wearing the tudung is '
  +'required by her faith suffices — the court need not assess whether the practice is objectively '
  +'essential to Islam as a whole.')),
amberBox([
  lbl('EVALUATIVE — Eweida approach in Singapore: Will it be adopted?','C55A11'),
  bl(R('Unlikely, but academically powerful. The ECHR sincere belief approach respects individual '
    +'religious conscience without requiring courts to engage in theology. However, Singapore courts '
    +'have not endorsed the ECHR framework (four-walls approach per Colin Chan v PP) and the '
    +'essentiality standard is more consistent with existing Art 15 jurisprudence. The Eweida '
    +'position should be raised as an alternative but with the acknowledgement it is unlikely '
    +'to prevail in its full form.')),
]),

p(R(B('Assessment:'),R(' On current Singapore jurisprudence, Shamsiah has a strong case that the '
  +'tudung is a "religious practice" protected under Art 15(1) — it is widely regarded as obligatory '
  +'by a reasonable body of Muslim adherents, and Shamsiah sincerely holds this view. The first '
  +'limb of Art 15(1) is engaged.'))),

H2('III.  Article 15(4) — Permitted Restrictions on Religious Freedom'),
p(R('Art 15(4): "This Article does not authorise any act contrary to any general law relating to '
  +'public order, public health or morality." The Government will seek to justify the tudung policy '
  +'as consistent with Art 15(4) — specifically on public order grounds (religious harmony '
  +'in a multi-racial, multi-religious society) or under the "general law of general application" '
  +'exception.')),

H3('(A) Three-Stage Analysis under Vijaya Kumar'),
p(R('The most recent Singapore approach, per '),CL('Vijaya Kumar v AG'),R(' [2015] (Rajah JA), '
  +'replaces the categorical public-order-always-trumps approach from '),CL('Colin Chan v PP'),R(' '
  +'(1994) with a form of proportionality-tinged balancing:')),
pi(B('Stage 1:'),R(' Is the practice protected by Art 15(1)? [Discussed above — yes]')),
pi(B('Stage 2:'),R(' Does the state restriction fall within the scope of Art 15(4)? I.e., is the '
  +'restriction: (a) pursuant to a "general law"; (b) relating to public order, public health, '
  +'or morality?')),
pi(B('Stage 3:'),R(' Is the restriction "reasonable" in the sense that it is not overly broad and '
  +'bears a sufficient nexus to the public order objective?')),

H3('(B) Is the Tudung Policy a "General Law of General Application"?'),
p(R('The tudung policy as described — communicated through government announcements and "ongoing '
  +'discussions" — appears to be an '),B('administrative/executive policy'),R(', not a '
  +'statute or subsidiary legislation. This raises a threshold Art 15(4) problem: does "general law" '
  +'in Art 15(4) extend to executive policies, or only to formally enacted legislation?')),
amberBox([
  lbl('EVALUATIVE — "General law" in Art 15(4): Policy vs Statute','C55A11'),
  bl(B('Argument that executive policy is NOT "general law":'),R(' Art 15(4) refers to '
    +'"any general law" — the requirement of "generality" imports the common law concept of a law '
    +'of general application (applying equally to all). An administrative policy is not a "law" in '
    +'this sense. It lacks Parliamentary imprimatur and democratic legitimacy. Without legislative '
    +'backing, the policy cannot validly restrict an Art 15(1) right. '
    +'This is the stronger doctrinal argument.'))),
  bl(B('Argument that executive policy IS "general law":'),R(' Singapore courts have '
    +'sometimes broadly construed "law" to include lawfully made subsidiary legislation and '
    +'executive rules (cf '),CL('Chng Suan Tze v MHA'),R(' on the meaning of "law"). '
    +'If the government can demonstrate the policy flows from lawful statutory authority '
    +'(e.g., Civil Service Regulations, healthcare regulations), it may meet the threshold.'))),
  bl(B('Impact on the case:'),R(' If the policy is not a "general law", it cannot be saved '
    +'by Art 15(4) at all — this is potentially a knock-out blow without even reaching the '
    +'public order balancing stage.'))),
]),

H3('(C) Is the Restriction Justified on Public Order Grounds?'),
p(R(B('Pre-Vijaya Kumar (Colin Chan approach — categorical):'),R(' In '),CL('Colin Chan v PP'),R(', '
  +'the court held that public order concerns '),B('categorically'),R(' override Art 15(1) rights. '
  +'Under this approach, the Government\'s communitarian concern about religious harmony — that '
  +'concessions to one group may trigger demands from others and destabilise social harmony — would '
  +'automatically justify the restriction.'))),
p(R(B('Post-Vijaya Kumar (balancing approach):'),R(' In '),CL('Vijaya Kumar'),R(', Rajah JA '
  +'shifted to a more contextual, proportionality-like inquiry. The restriction must be '
  +'"reasonable" and the connection between the restriction and the public order interest '
  +'must be demonstrated, not merely asserted. Importantly, Rajah JA described the approach as '
  +'"quasi-balancing" — not a full ECHR-style proportionality analysis, but more than '
  +'categorical deference.'))),
amberBox([
  lbl('EVALUATIVE — Which approach do courts apply? And what does it mean for Shamsiah?','C55A11'),
  bl(R('The tension between Colin Chan (categorical) and Vijaya Kumar (quasi-balancing) is '
    +'THE critical jurisprudential question for this essay. Both are Court of Appeal decisions; '
    +'there is no clear hierarchical resolution. Vijaya Kumar is later in time and arguably '
    +'represents the current position.')),
  bl(B('Under Colin Chan:'),R(' The Government wins automatically — public order considerations '
    +'(religious harmony, preventing "aggressively competitive" demands from other groups) '
    +'suffice to justify the restriction. Courts do not inquire further into whether the '
    +'restriction is proportionate.'))),
  bl(B('Under Vijaya Kumar:'),R(' The Government must demonstrate: (i) a genuine public '
    +'order need — not merely hypothetical unrest; (ii) the restriction is not overbroad; '
    +'(iii) there is a reasonable nexus between the restriction and the need. The fact that '
    +'the policy is "under ongoing review" is probative against (i) — it suggests the Government '
    +'itself is not convinced the restriction remains necessary. The nursing context '
    +'(President Halimah Yacob wears hijab in her public duties; tudung is now permitted '
    +'in the Singapore Nursing College) also weakens the Government\'s public order '
    +'justification for the policy in hospitals.')),
  bl(B('Assessment:'),R(' Courts are likely to apply a Vijaya Kumar-informed approach '
    +'but with considerable deference to the Government on religious harmony judgements. '
    +'The case is genuinely borderline. Shamsiah\'s strongest argument is that the '
    +'Government\'s own acknowledgement that the policy is "under review" and the '
    +'President\'s ability to wear hijab demonstrate the absence of a compelling public '
    +'order necessity.')),
]),

H2('IV.  Article 12(1) — Discriminatory Treatment'),
H3('The Core Art 12 Claim'),
p(R('The Art 12 challenge is potentially as powerful as the Art 15 challenge. The policy: '
  +'(a) permits Sikh police officers to wear turbans; (b) exempts Sikh motorcyclists from '
  +'wearing helmets over their turbans (Road Traffic (Helmet Exemption) Order 2005); '
  +'(c) historically prohibits Muslim women from wearing tudung in the same public-facing '
  +'roles. This differential treatment may violate Art 12(1) and — depending on the nature '
  +'of the differentia — Art 12(2) (non-discrimination on grounds of religion).')),

H3('Art 12(2) — Express Prohibition on Religious Discrimination'),
p(R('Art 12(2) expressly prohibits discrimination against citizens on the ground '),
  B('"only of religion"'),R(' in any law or in the appointment to any office or employment under '
  +'a public authority. If the tudung policy results in Muslim women being denied appointment '
  +'to certain public sector roles solely because of their religious practice (wearing the '
  +'tudung), this is prima facie discrimination on grounds of religion — squarely within '
  +'Art 12(2).')),
amberBox([
  lbl('EVALUATIVE — Does Art 12(2) apply? Is it "only" of religion?','C55A11'),
  bl(R('The Government may argue the distinction is not "only" of religion — it is also of '
    +'professional dress codes, secular service requirements, and communal harmony considerations. '
    +'But the reality is that the tudung is '),B('exclusively'),R(' a religious marker for Muslim '
    +'women — there is no non-religious reason why a Muslim nurse wearing a tudung differs '
    +'from a non-Muslim nurse without one, other than the religious significance of the '
    +'tudung. Courts should pierce through to the substantive effect: the policy discriminates '
    +'against Muslim women on the basis of their religious practice, which is their '
    +'religion. This falls squarely within Art 12(2).')),
]),

H3('Art 12(1) — Comparing Sikh and Muslim Religious Dress'),
p(R('Apply the '),CL('Syed Suhail'),R(' two-step (executive action):')),
pi(B('Step 1:'),R(' Are Muslim women wearing tudung and Sikh men wearing turbans "equally situated"? '
  +'Both are practising members of their respective faiths who wish to wear religious '
  +'headgear in a professional/public context as an expression of obligatory religious '
  +'practice. They are '),B('equally situated'),R(' as public servants and members of '
  +'the public wishing to manifest their religion through dress.')),
pi(B('Step 2:'),R(' Is the differential treatment (permitting Sikh turban; prohibiting Muslim '
  +'tudung) reasonable? The Government must demonstrate that this distinction bears a '
  +'sufficient rational relation to the objective of secular public service/religious harmony.')),
p(R('The Government\'s likely justifications and their weaknesses:')),
pii(B('Historical entrenchment:'),R(' The Sikh turban concession dates from colonial times '
  +'— it is therefore a historical anomaly rather than a principled distinction. This '
  +'actually '),B('weakens'),R(' the Government\'s position because it shows the distinction '
  +'rests on historical practice rather than principled difference in the potential '
  +'for disruption between the two religious garments.')),
pii(B('Visibility/provocation:'),R(' The tudung may be more "visible" than the turban as '
  +'a religious marker in nursing. However, this argument is empirically questionable '
  +'and the Court of Appeal in '),CL('Vijaya Kumar'),R(' suggested that mere speculative '
  +'harm to public order is insufficient.')),
pii(B('Kirpan comparison (Op Hee Ja Bing):'),R(' Sikhs '),B('cannot'),R(' carry kirpans — '
  +'the restriction on Sikh kirpans offsets the turban concession. This suggests '
  +'a form of package parity. However, this weakens the Government\'s Art 12 position: '
  +'if Sikhs are restricted on one practice (kirpan) but permitted another (turban), '
  +'and Muslims are prohibited from the equivalent practice (tudung), the net effect '
  +'is still differential treatment of Muslim religious dress vis-à-vis Sikh.')),

H2('V.  Likely Judicial Outcome — Assessment'),
p(R(B('Art 15:'),R(' Shamsiah has a prima facie strong Art 15(1) claim. '
  +'Whether the restriction survives Art 15(4) depends on which approach the court applies. '
  +'Under Colin Chan (categorical), the Government likely wins. '
  +'Under Vijaya Kumar (quasi-balancing), the Government faces a genuine challenge — '
  +'particularly given that the policy is itself under review. Courts are likely to give '
  +'the Government considerable deference on religious harmony questions, '
  +'but the ongoing-review context weakens the Government\'s position significantly.'))),
p(R(B('Art 12:'),R(' The Art 12 challenge — particularly under Art 12(2) — is the strongest '
  +'avenue. The comparison with Sikh turbans is factually compelling. However, courts may '
  +'be reluctant to strike down a longstanding policy with deep communal implications '
  +'on Art 12 grounds without legislative recourse. A declaratory finding of Art 12 '
  +'inconsistency is possible but the court may grant standing and remit the issue '
  +'to government.'))),
p(R(B('Overall:'),R(' The courts are '),B('likely to uphold the policy for now'),R(', '
  +'primarily because of the deference they accord to executive judgement on religious '
  +'harmony. However, the case is genuinely borderline under Vijaya Kumar, and the '
  +'ongoing-review context, the President\'s own example, and the Art 12 Sikh comparison '
  +'create meaningful constitutional pressure that may ultimately produce legislative reform '
  +'rather than judicial intervention.'))),

purpBox([
  lbl('★  STRATEGIC ADVICE (Purple) — Ministry of Law Perspective','7030A0'),
  bl(PRPB('ADVISE ON RISK:'),PRP(' Frame the legal opinion to the Minister as identifying '
    +'GENUINE constitutional risk — particularly under Art 12(2) and the Vijaya Kumar '
    +'quasi-balancing approach. The "ongoing discussions" language may actually increase '
    +'constitutional risk by suggesting the Government lacks a definitive public order '
    +'justification.')),
  bl(PRPB('RECOMMEND LEGISLATIVE ROUTE:'),PRP(' The most constitutionally sound approach is to '
    +'enact specific legislation authorising the restriction, with clear public order findings '
    +'on the record. This gives the restriction "general law" status under Art 15(4) and '
    +'creates a legislative record supporting the Art 15(4) and Art 12 justifications.')),
  bl(PRPB('REMEDIES AVAILABLE TO SHAMSIAH:'),PRP(' (1) Declaration that the policy violates '
    +'Arts 15(1) and/or 12(1)/(2). (2) Mandatory order compelling the Government to permit '
    +'the tudung in her specific public healthcare role pending a full constitutional review. '
    +'(3) She should NOT seek a prohibitory order against the Government before '
    +'applying for the position — she should apply and, if refused on tudung grounds, '
    +'challenge that specific refusal decision (concrete harm, clearest standing).')),
  bl(PRPB('TIMING OF SHAMSIAH\'S CHALLENGE:'),PRP(' Do not seek judicial review before '
    +'she has actually been told to remove the tudung. Wait for the specific, concrete '
    +'restriction to crystallise (upon joining service). This ensures standing is '
    +'unambiguous and the harm is actual, not anticipatory — avoiding the chilling effect '
    +'argument rejected in '),CL('Tan Seng Kee'),PRP('.')),
]),

// ── Q5 ─────────────────────────────────────────────────────────────────────
PB(),
H1('AY2020–21  Q5 — Syed Suhail / Art 12(1) "Legitimate Reasons"'),

H2('Question'),
p(R('In '),CL('Syed Suhail bin Syed Zin v AG'),R(' [2020] SGCA 122, the Court of Appeal stated that '
  +'where differential treatment is afforded to individuals under Art 12(1), such differential '
  +'treatment would only be reasonable if "it was based on legitimate reasons." '
  +'What are the implications of this statement? Should this change the way we interpret Art 12(1)?')),

pinkBox([
  lbl('Examiner Feedback — Q5 (AY20-21)','9B1F6E'),
  bl(R('✓ Best answers: Close and detailed analysis of Syed Suhail; contextualised against prior '
    +'cases; drew out possible implications for constitutionality of LEGISLATION (not just '
    +'executive action).')),
  bl(R('✓ The poorer answers merely regurgitated everything known about Art 12 and the RCT '
    +'without engaging specifically with Syed Suhail\'s departure.')),
  bl(RED('✗ Common failure: Treating Syed Suhail as merely restating the existing RCT. The '
    +'question specifically asks about IMPLICATIONS and whether it should CHANGE the '
    +'interpretation of Art 12. These are distinct tasks — description ≠ analysis.')),
]),
SP(),

H2('Thesis'),
p(R('The "legitimate reasons" formulation in '),CL('Syed Suhail'),R(' represents a '),
  B('meaningful departure from the earlier reasonable classification test (RCT)'),R(' as applied '
  +'in '),CL('Lim Meng Suang v AG'),R(' [2015] — but its full implications remain contested. '
  +'At minimum, Syed Suhail: (i) recalibrates the '),I('standard of review'),R(' for executive '
  +'action under Art 12; (ii) shifts '),I('the burden of proof'),R(' more squarely onto the '
  +'decision-maker once a prima facie case is established; and (iii) implicitly '
  +'introduces a '),I('qualitative assessment of reasons'),R(' — moving beyond the binary '
  +'intelligibility/nexus analysis of the LMS approach. Whether it should '
  +'change the interpretation of Art 12 for '),B('legislation'),R(' (not merely executive '
  +'action) remains the most analytically important and contested question the case raises.')),

H2('I.  The Syed Suhail Decision — What the Court Actually Said'),
H3('Facts and Holding'),
p(CL('Syed Suhail bin Syed Zin v AG'),R(' [2020] SGCA 122: Applicant, a drug addict serving '
  +'a Long-Term Detention Order (LT-2) under the Misuse of Drugs Act, was not offered the '
  +'alternative Drug Rehabilitation Centre (DRC) regime offered to other addicts in similar '
  +'situations. He argued this constituted unjustified differential treatment under Art 12(1). '
  +'The SGCA upheld the decision on the facts but significantly reformulated the Art 12 test '
  +'for executive action.')),
H3('The Reformulated Test'),
p(R('The Court of Appeal articulated a '),B('two-step test'),R(' for Art 12(1) challenges '
  +'to executive action:')),
pi(B('Step 1 (applicant\'s burden):'),R(' The applicant must show that he/she has been '
  +'treated differently from others who are '),B('"equally situated"'),R(' — i.e., persons '
  +'in the same material circumstances.')),
pi(B('Step 2 (decision-maker\'s burden):'),R(' Once Step 1 is established, the burden '
  +'shifts to the decision-maker to justify the differential treatment. The differential '
  +'treatment is only reasonable if "it was based on '),B('legitimate reasons'),R('" — '
  +'specifically, reasons bearing a sufficient rational relation to the object for which '
  +'the power was conferred.')),
p(R('The Court further noted that where life and liberty are at stake, '),
  B('"searching scrutiny"'),R(' applies to the justification offered.')),

H3('How Syed Suhail Differs from the Prior Approach'),
p(R('The prior approach in '),CL('Howe Yoon Chong v Chief Assessor'),R(' required proof of '
  +'"deliberate and arbitrary" discrimination — a high standard requiring both intentionality '
  +'and arbitrariness. In '),CL('Eng Foong Ho v AG'),R(', the court stated executive action '
  +'would violate Art 12 only if it amounts to "intentional and arbitrary discrimination." '
  +'The SGCA in '),CL('Syed Suhail'),R(' criticised this as setting "the bar even higher" than '
  +'warranted — even reckless, unreasoned differential treatment might escape scrutiny under '
  +'the old formulation if the decision-maker did not explicitly '),I('intend'),R(' to '
  +'discriminate. The "legitimate reasons" standard removes the deliberateness requirement '
  +'and focuses instead on the '),B('quality of the reasons'),R(' offered for differential treatment.')),

H2('II.  Implications of "Legitimate Reasons" — First-Order Analysis'),
H3('(A) For the Standard of Review of Executive Action'),
p(R('The most immediate implication is a '),B('tightening of scrutiny'),R(' for executive decisions. '
  +'"Legitimate reasons" imposes a qualitative assessment: the court must evaluate not merely '
  +'whether a reason exists (the old intelligibility limb) but whether that reason is '
  +'sufficiently '),I('legitimate'),R(' — i.e., connected to the lawful purpose of the power '
  +'being exercised and proportionate to the differential impact on the affected individual.')),
p(R('In '),CL('Xu Yuan Chen v AG'),R(' [2020]: The SGCA applied the Syed Suhail two-step to a '
  +'contempt prosecution and held that AG\'s selective prosecution of the editor of The Online '
  +'Citizen (but not the author, who was overseas and harder to prosecute) was justified by '
  +'legitimate reasons — the different enforcement difficulties. This illustrates that the '
  +'test operates as a '),B('genuine evidential inquiry'),R(' where the decision-maker bears a '
  +'real (not merely formulaic) burden of justification.')),

H3('(B) The "Equally Situated" Threshold'),
p(R('Syed Suhail\'s requirement that the applicant first show differential treatment of '),
  I('"equally situated"'),R(' persons is a significant threshold filter. Per Marcus Teo '
  +'("Refining Reasonable Classification" (2023)): this filter requires the court to identify '
  +'a comparator group — persons who are, in all material respects, in the same position as '
  +'the applicant. If the applicant cannot identify equally situated comparators, the Art 12 '
  +'claim does not get off the ground.')),
amberBox([
  lbl('EVALUATIVE — Is "equally situated" too restrictive a threshold?','C55A11'),
  bl(B('Problem:'),R(' Identifying "equally situated" persons in the context of executive '
    +'decisions (which are often highly individualised) may be very difficult. If the '
    +'executive can always point to some difference between the applicant and others '
    +'("Syed Suhail was classified differently for drug-specific reasons"), the first step '
    +'can effectively swallow the Art 12 claim before Step 2 is reached.'))),
  bl(B('Per Kenny Chng ("Loose Ends" [2024]):'),R(' The "equally situated" requirement '
    +'creates a definitional problem: the more narrowly the comparator class is defined, '
    +'the fewer people will be "equally situated" and the harder it becomes to establish '
    +'differential treatment. Courts should define the comparator class at the level of '
    +'relevant characteristics rather than allowing the decision-maker to frame the '
    +'comparator class narrowly to avoid Step 2 scrutiny.'))),
]),

H3('(C) The Role of "Searching Scrutiny" when Life and Liberty are at Stake'),
p(R('The SGCA\'s reference to "searching scrutiny" when life and liberty are at stake introduces '
  +'a variable standard of review into Art 12 — implying that the standard varies with the '
  +'gravity of the rights impact. This mirrors the proportionality principle in ECHR/EU law '
  +'(Wednesbury + heightened scrutiny for fundamental rights) but is couched in domestic '
  +'terminology. The implications:')),
pi(R('Where the differential executive treatment merely affects economic interests (cf. '
  +CL('Eng Foong Ho'),R(' — land acquisition for religious institution), a lower standard applies.')));
pi(R('Where the differential treatment involves criminal prosecution, detention, or '
  +'deprivation of fundamental liberty (cf. '),CL('Ramalingam Ravinthran v AG'),R('), '
  +'"searching scrutiny" requires the decision-maker to provide cogent, specific, and '
  +'operational justifications — not merely general policy considerations.')),

H2('III.  The Larger Question: Implications for Art 12 and Legislation'),
H3('(A) Does Syed Suhail Apply to Legislation?'),
p(R('This is the central contested question. The SGCA in '),CL('Syed Suhail'),R(' was '
  +'concerned with '),B('executive action'),R(' (prosecutorial/administrative decision-making). '
  +'The existing test for '),B('legislation'),R(' remains the RCT from '),
  CL('Lim Meng Suang'),R(' — which asks whether the legislative differentia is intelligible '
  +'and whether there is a rational nexus to the legislative object.')),
p(R('In '),CL('Tan Seng Kee v AG'),R(' [2022] (TSK): The SGCA in '),I('obiter'),R(' noted '
  +'two versions of the RCT: the LMS approach (restricts scrutiny to asking whether differentia '
  +'is "so unreasonable as to be illogical and/or incoherent") and the Syed Suhail approach '
  +'(requiring "legitimate reasons" with a sufficient rational relation). TSK did not resolve '
  +'which approach is correct for legislation — stating only that "there might even be '
  +'a difference when considering statutory provisions as compared to executive action for '
  +'compatibility with Art 12."')),
amberBox([
  lbl('EVALUATIVE — Should Syed Suhail\'s "legitimate reasons" standard apply to legislation?','C55A11'),
  bl(B('Arguments FOR extending to legislation:'),R(' (i) Chan Sek Keong\'s academic critique: '
    +'The RCT as applied in LMS produces circular reasoning — if the legislative purpose is '
    +'defined to coincide with the differentia, the RCT is always satisfied. '
    +'"Legitimate reasons" would require independent inquiry into whether the legislative '
    +'purpose is substantively justified. (ii) TSK itself rejected the presumption '
    +'of constitutionality as a strong operating principle, noting courts are co-equal '
    +'branches, not subordinate to Parliament. (iii) Where legislation affects fundamental '
    +'liberty (e.g., criminal penalties — s 377A), "searching scrutiny" under Syed Suhail '
    +'would give Art 12(1) real protective content that LMS\'s minimal rational nexus '
    +'test cannot.'))),
  bl(B('Arguments AGAINST extending to legislation:'),R(' (i) SOP: courts would become '
    +'de facto legislators if they can assess the substantive legitimacy of legislative '
    +'purposes. TSK itself acknowledged "there might even be a difference" for legislation. '
    +'(ii) Institutional competence: legislatures possess superior information, democratic '
    +'mandate, and policy expertise on social questions. Courts applying "searching scrutiny" '
    +'to legislation risk substituting judicial for legislative preferences. '
    +'(iii) Practical: Virtually all legislation would be challengeable — creating '
    +'constitutional instability.'))),
  bl(B('Better view (Marcus Teo):'),R(' The same test should apply to both legislation '
    +'and executive action, but the test operates differently in each context. For executive '
    +'decisions, the relevant "legitimate reasons" are the specific reasons actually '
    +'considered by the decision-maker — courts can assess these concretely. '
    +'For legislation, abstract "practical reasons" for imperfect generalisation are '
    +'accepted as legitimate (e.g., over-inclusiveness tolerated for workability). '
    +'This maintains a single framework while producing sensibly different outcomes.'))),
]),

H3('(B) Implications for the Constitutionality of s 377A (TSK Obiter)'),
p(R('In TSK, the SGCA applied the Syed Suhail and LMS approaches in obiter to s 377A (criminalising '
  +'sexual acts between males). Under the LMS approach, s 377A survived — the differentia '
  +'(male-male acts) bore a rational nexus to the legislative purpose (public morality). '
  +'Under the Syed Suhail approach, the court suggested that "searching scrutiny" would apply '
  +'because life and liberty were at stake — potentially placing a higher evidential burden '
  +'on the Government to demonstrate that the restriction on liberty arising from criminalisation '
  +'was justified by "legitimate reasons."')),
p(R('Chan Sek Keong\'s critique ('),I('"Equal Justice Under the Constitution and s 377A"'),
  R(' (2019)): s 377A is self-evidently '),B('under-inclusive'),R(' — if the legislative '
  +'object is public morality, restricting only male-male acts and not female-female or '
  +'male-female acts of the same type is irrational. The "legitimate reasons" standard would '
  +'expose this under-inclusiveness to judicial scrutiny and potentially render s 377A '
  +'unconstitutional. Under the LMS approach, s 377A is sustained by minimal rational nexus.')),

H2('IV.  Should "Legitimate Reasons" Change Art 12 Interpretation?'),
H3('Position 1: Yes — it should apply broadly and mark a shift'),
p(R('Syed Suhail should be understood as a '),B('corrective'),R(' to the LMS approach\'s '
  +'excessive deference. The "legitimate reasons" standard gives Art 12(1) substantive '
  +'teeth: it demands actual justification rather than accepting any formulated '
  +'intelligible purpose. This better reflects Art 4\'s constitutional supremacy mandate '
  +'and the Ong Ah Chuan injunction to avoid "austerity of tabulated legalism." '
  +'If courts extend this to legislation, the result is a more robust Art 12 that functions '
  +'as a genuine equality guarantee, not merely a check on irrational classifications.')),
H3('Position 2: No — it should be confined to executive action'),
p(R('Applying "legitimate reasons" to legislation would constitute inappropriate judicial '
  +'activism. Courts cannot assess the substantive wisdom of legislative classifications '
  +'without becoming mini-legislatures (TSK; YVK (2015)). The proper scope of Syed Suhail '
  +'is executive action — where the court has historically exercised more active supervisory '
  +'jurisdiction ('),CL('Chng Suan Tze v MHA'),R(' — "all power has legal limits"). '
  +'The asymmetric application of different tests to legislation vs executive action '
  +'is not unprincipled — it reflects the different constitutional positions of the '
  +'legislature (democratically elected; supreme within Art 4) and the executive '
  +'(delegated authority; fully subject to judicial review).')),
H3('Balanced Assessment'),
p(R('The "legitimate reasons" standard represents a genuine and welcome development for '
  +'executive action, where its application is principled and workable. Its extension '
  +'to legislation should be limited and calibrated — applying heightened scrutiny '
  +'only where: (a) the legislative classification is highly specific and individualised '
  +'(not a general policy applicable to many); or (b) the classification directly affects '
  +'fundamental liberties (life, personal liberty, religion). This produces a coherent '
  +'framework: general legislation is tested under LMS\'s minimal rationality; '
  +'specific liberty-affecting classifications receive Syed Suhail\'s "legitimate reasons" '
  +'scrutiny. TSK\'s obiter endorses this differentiated approach without fully resolving it.')),

purpBox([
  lbl('★  STRATEGIC ADVICE (Purple) — Essay Technique','7030A0'),
  bl(PRPB('STRUCTURE:'),PRP(' The examiner\'s instruction specifies (1) implications and '
    +'(2) should this change Art 12 interpretation. These are separate tasks. '
    +'Address implications first (evidence-based, case-law heavy); then take a position '
    +'on whether Art 12 should change (evaluative, thesis-driven).')),
  bl(PRPB('HIGHEST VALUE POINT:'),PRP(' The question of whether Syed Suhail changes Art 12 '
    +'interpretation for '),CL('legislation'),PRP(' (not just executive action) is what '
    +'examiners are looking for. The TSK obiter is the critical peg. Most students '
    +'address only the executive action dimension — addressing legislation marks you '
    +'out as a high-scorer.')),
  bl(PRPB('ACADEMIC SOURCES TO DEPLOY:'),PRP(' Marcus Teo "Refining Reasonable Classification" '
    +'(2023); Chan Sek Keong "Equal Justice Under the Constitution and s 377A" (2019); '
    +'Kenny Chng "Loose Ends" (2024). Examiners reward engagement with academic '
    +'commentary that critically evaluates the case law.')),
]),

// ═══════════════════════════════════════════════════════════════════════════
PB(),
H1('AY2022–23  SECTION B'),
// ═══════════════════════════════════════════════════════════════════════════

PB(),
H1('AY2022–23  Q3 — Art 12 Scope and the RCT'),

H2('Question'),
p(R('"The local courts have unjustifiably limited the range and scope of Article 12 by limiting '
  +'it to the reasonable classification test." Critically analyse and discuss the validity '
  +'of this statement.')),

pinkBox([
  lbl('Examiner Feedback — Q3 (AY22-23)','9B1F6E'),
  bl(R('The question requires examination of: (a) the range and scope of Art 12(1); '
    +'(b) what the RCT is; (c) whether exclusive use of the RCT limits the scope of Art 12(1); '
    +'and (d) whether such limitation is justifiable.')),
  bl(R('✓ Students who discussed: whether "equal before the law" and "equal protection of the law" '
    +'mean the same thing; the problem of circularity in the RCT; application to constitutional '
    +'vs administrative law contexts; whether legislative objects can be challenged under rule '
    +'of law — scored well.')),
  bl(RED('✗ Poor scripts: Purely descriptive; "garbled the descriptive analysis"; "evaluated '
    +'competing tests purely on the basis of free-standing moral arguments" without grounding '
    +'in case law.')),
  bl(RED('✗ Common omissions: (a) failing to explain whether/how the RCT applies differently '
    +'to legislation vs executive action; (b) failing to give a concrete example of how '
    +'different tests would produce different results.')),
]),
SP(),

H2('Thesis'),
p(R('The statement is '),B('substantially correct, but requires qualification.'),R(' The courts\' '
  +'exclusive application of the RCT to Art 12(1) has indeed limited its range and scope in '
  +'two respects: (i) the conflation of the two distinct textual limbs ("equal before the law" '
  +'and "equal protection of the law") into a single RCT inquiry; and (ii) the application '
  +'of a minimal rationality standard that rarely, if ever, results in a finding of '
  +'unconstitutionality. However, the limitation is '),B('not entirely unjustifiable'),R(' — '
  +'the courts\' approach reflects legitimate institutional concerns about the separation of '
  +'powers and the proper role of the judiciary. The more defensible criticism is not that '
  +'the RCT should be abandoned but that its application has been '),B('too deferential and '
  +'too circular'),R(' — a calibration problem rather than a structural fault. Recent '
  +'developments in '),CL('Syed Suhail'),R(' and '),CL('Tan Seng Kee'),R(' suggest '
  +'the courts are beginning to address this.')),

H2('I.  The Range and Scope of Art 12(1) — What Does the Provision Protect?'),
H3('Textual Analysis — The Two Limbs'),
p(R('Art 12(1) contains two distinct textual limbs: (1) "All persons are '),
  B('equal before the law'),R('" (EBL); and (2) "all persons are '),
  B('entitled to the equal protection of the law'),R('" (EPC).')),
p(R('In '),CL('Lim Meng Suang v AG'),R(' [2015] (CA), the court held that both limbs '
  +'are covered by the RCT and effectively function as declaratory equivalents — '
  +'neither adds independently operative content beyond the other.')),
p(R('The key structural critique from '),B('Chan Sek Keong'),R(', "Equal Justice Under '
  +'the Constitution and s 377A" (2019):')),
pi(B('EBL'),R(' is a '),B('first-order positive right'),R(' — it exists independent '
  +'of any legislative or executive action. It means "among equals, the law shall '
  +'be equal and equally administered without privilege." It is an affirmative '
  +'constitutional guarantee directly enforceable against any branch of government.')),
pi(B('EPC'),R(' is a '),B('second-order negative right'),R(' — it is contingent on '
  +'the existence of laws that differentiate. It protects against unequal application '
  +'of laws that already exist. The RCT was formulated for this limb.')),
p(R('CSK\'s critique: By conflating both limbs under the RCT, the courts have '
  +'deprived EBL of any independent normative content. The RCT is a tool for '
  +'assessing whether legislation violates EPC — it does not give effect to EBL '
  +'as an affirmative constitutional guarantee.')),
amberBox([
  lbl('EVALUATIVE — Is EBL genuinely different from EPC in Singapore\'s constitutional context?','C55A11'),
  bl(B('Pro-distinction:'),R(' Singapore\'s Art 12(1) expressly contains both limbs, unlike '
    +'the Indian Constitution (Art 14 — only EBL + EPC but treated as unitary) or the US '
    +'14th Amendment (only EPC). The presence of both limbs is deliberate — if they meant '
    +'the same thing, the framers would not have included both. CSK\'s analysis draws '
    +'on this structural observation: "The Court in LMS has blindly adopted the RC test from '
    +'India and the US without considering that those constitutions do not guarantee EBL."'))),
  bl(B('Pro-unification (Lim Meng Suang CA):'),R(' The court\'s position is that the two '
    +'limbs, while technically distinct, are both satisfied by the same RCT inquiry — '
    +'the RCT captures the essence of both: treating like cases alike and protecting '
    +'against irrational distinctions. The court also invoked Westen\'s "equality as '
    +'an empty container" argument — without a governing rule (the RCT), equality is '
    +'meaningless. Splitting the two limbs risks creating a free-floating "equal before '
    +'the law" right that courts cannot operationalise without becoming legislators.'))),
  bl(B('Assessment:'),R(' The better view is that EBL has some independent content '
    +'over and above EPC — at minimum, it requires that the law be applied equally '
    +'and without privilege, regardless of whether the law itself is classifying. '
    +'The LMS conflation is a doctrinal shortcut that weakens the provision\'s '
    +'protective scope.'))),
]),

H2('II.  What is the RCT and How Has it Been Applied?'),
H3('Formulation and Elements'),
p(R('First articulated in Singapore in '),CL('Ong Ah Chuan v PP'),R(' [1981] (PC) and '
  +'developed through '),CL('Taw Cheng Kong v PP'),R(', '),CL('Lim Meng Suang'),R(', '
  +'and '),CL('Tan Seng Kee v AG'),R(' [2022], the RCT asks:')),
pi(B('(i) Intelligible differentia:'),R(' Does the law/action distinguish persons '
  +'grouped together from those left out, on an intelligible basis?')),
pi(B('(ii) Rational nexus:'),R(' Does that differentia have a rational relation to '
  +'the object sought to be achieved by the law in question?')),

H3('Problems with the RCT as Currently Applied'),
H4('(A) Circular Reasoning in Purpose Identification'),
p(R('In '),CL('Lim Meng Suang'),R(' (CA), in assessing s 377A:')),
pi(R('The court identified the legislative purpose as "to criminalise certain sexual acts '
  +'between men" — which is the same as the differentia itself (sexual acts between men). '
  +'This renders the RCT tautological: the "purpose" is identified '),I('from'),R(' the '
  +'differentia, then the differentia is said to have a rational nexus '),I('to'),R(' that '
  +'purpose. As CSK notes: "the differentia tells us nothing about the purpose of the Act."')),
pi(R('Marcus Teo ("Refining Reasonable Classification" (2023)) identifies this as the '
  +'"purpose identification problem": courts must identify the '),B('independent legislative '
  +'object'),R(' — not derive it circularly from the differentia itself. Only when the object '
  +'is independently ascertained can the RCT\'s nexus limb do meaningful work.')),
amberBox([
  lbl('EVALUATIVE — How does Syed Suhail address circularity?','C55A11'),
  bl(R('In '),CL('Syed Suhail'),R(', the executive decision-maker\'s stated purpose '
    +'must be assessed separately from the differentia (whether Syed Suhail was treated '
    +'differently from others). The "legitimate reasons" standard requires the court '
    +'to evaluate the '),B('substantive justification'),R(' offered, not merely accept '
    +'any plausible purpose. This breaks the circularity: the court asks '),I('why'),R(' '
    +'the decision-maker treated persons differently — not whether any '),I('conceivable'),R(' '
    +'purpose could justify the distinction. Applied to legislation, this would require '
    +'courts to assess actual legislative intent from extrinsic materials rather than '
    +'reverse-engineering from the differentia — a more demanding and more meaningful inquiry.')),
]),

H4('(B) Sequencing Problem — Which Comes First: Differentia or Object?'),
p(R('To identify an "intelligible differentia," the court must first know what counts '
  +'as an "intelligible" basis for distinction — which depends on the legislative object. '
  +'But the legislative object is often itself derived from the differentia. This creates '
  +'a sequencing paradox: the RCT cannot be applied without knowing the legislative object, '
  +'but the legislative object cannot be identified without first knowing the differentia. '
  +'As Marcus Teo notes, this sequencing indeterminacy systematically advantages '
  +'the government — the court tends to accept whatever purpose the government puts forward '
  +'as the "object" of the legislation, however contrived.')),

H4('(C) Different Tests for Legislation vs Executive Action?'),
p(R('In '),CL('Eng Foong Ho v AG'),R(': executive action test = "intentional and arbitrary '
  +'discrimination." In '),CL('Howe Yoon Chong v Chief Assessor'),R(': same — must be '
  +'deliberate and arbitrary. In '),CL('Syed Suhail'),R(': shifted to "legitimate reasons" — '
  +'removes the deliberateness requirement. In '),CL('Tan Seng Kee'),R(' (obiter): '
  +'noted the distinction without resolving it.')),
p(R('This means the standard of review is '),I('higher'),R(' for executive action '
  +'(post-'),CL('Syed Suhail'),R(') than for legislation (still governed by LMS\'s '
  +'minimal rational nexus). Whether this asymmetry is principled or anomalous is '
  +'the central evaluative question.')),
amberBox([
  lbl('EVALUATIVE — Is the asymmetry (stricter for executive, lenient for legislation) principled?','C55A11'),
  bl(B('Principled:'),R(' (i) Legislative classifications represent Parliament\'s '
    +'collective democratic judgement — courts should be slow to second-guess. '
    +'Executive decisions are individualised and more amenable to the kind of '
    +'case-by-case justification that "legitimate reasons" demands. (ii) The SOP '
    +'doctrine ('),CL('Mohammad Faizal'),R(') supports restraint in judicial review '
    +'of legislation. (iii) TSK specifically acknowledges the possible difference.'))),
  bl(B('Not principled (better view):'),R(' (i) Art 4\'s constitutional supremacy '
    +'mandate applies equally to legislation and executive action — the Constitution '
    +'is supreme over both. If "legitimate reasons" is needed to protect Art 12 '
    +'against arbitrary executive decisions, the same logic applies against arbitrary '
    +'legislation. (ii) CSK argues the RCT as applied to legislation is so permissive '
    +'that it provides effectively no constitutional check — Parliament can always '
    +'formulate a plausible purpose. (iii) Marcus Teo: the same test should apply '
    +'to both, but it operates differently in each context — not less demandingly.'))),
]),

H2('III.  Illustration — How Different Tests Produce Different Results'),
p(R(B('Example: s 377A Penal Code'),R(' (criminalising sexual acts between males)')),
  B('Under LMS approach:')),
pi(R('Differentia: male-male sexual acts')),
pi(R('Legislative object: public morality / safeguarding a code of sexual conduct')),
pi(R('Rational nexus: Yes — the differentia (male-male acts) bears a rational connection '
  +'to the purpose of public morality regulation. The court does not assess whether '
  +'the purpose is substantively legitimate or whether the under-inclusion (female-female '
  +'acts not criminalised) defeats the nexus.')),
pi(R(B('Result: s 377A survives.'))),
SP(),
p(R(B('Under Syed Suhail / "legitimate reasons" approach:'))),
pi(R('"Searching scrutiny" applies — life and liberty are at stake (criminal penalty).')),
pi(R('The AG must demonstrate that the restriction of liberty specifically targeting '
  +'male-male conduct is justified by legitimate reasons — not merely a plausible purpose.')),
pi(R('CSK\'s under-inclusiveness argument: If the object is public morality, female-female '
  +'conduct of the same type is equally contrary to that morality. The failure to criminalise '
  +'it renders the classification '),B('significantly under-inclusive'),R(' — no '
  +'legitimate reason (other than historical accident or gender-based indifference) can '
  +'explain the restriction. Legitimate reasons do not sustain an inconsistent application '
  +'of the moral standard purportedly underlying the legislation.')),
pi(R(B('Result: Under genuine "searching scrutiny," s 377A is more vulnerable '
  +'to unconstitutionality.'))),

H2('IV.  Is the Limitation Justifiable?'),
H3('Arguments that the limitation IS justifiable'),
pi(R(B('SOP:'),R(' Courts are not equipped to evaluate the substantive wisdom of legislative '
  +'purposes. The RCT preserves parliamentary sovereignty within constitutional limits. '
  +'A more demanding test risks transforming the judiciary into "a super-legislature" '
  +'(YVK [2015] at [75]). Institutional humility is constitutionally appropriate.')),
pi(R(B('Westen on emptiness:'),R(' Without a governing rule like the RCT, "equality" '
  +'has no determinate content. A minimal rationality test at least provides a floor '
  +'below which legislative choices cannot go. Expanding to subjective assessment of '
  +'purposes risks judicial value-imposition.')),
pi(R(B('TSK\'s movement:'),R(' The courts have not simply stood still — TSK rejected '
  +'the presumption of constitutionality as a strong working principle and noted the '
  +'potential for Syed Suhail to apply. Incremental judicial development, rather than '
  +'bold re-imagination, is the more stable constitutional path.')),
H3('Arguments that the limitation is NOT justifiable'),
pi(R(B('Constitutional supremacy:'),R(' Art 4 makes the Constitution supreme over ALL '
  +'legislation. If the RCT so rarely produces findings of unconstitutionality, '
  +'something has gone wrong with the court\'s interpretation of Art 12(1) as supreme '
  +'constitutional law.')),
pi(R(B('EBL has been hollowed out:'),R(' If EBL is merely equivalent to EPC and both '
  +'are captured by the same minimal RCT, the Constitution\'s explicit guarantee of '
  +'equality "before the law" adds nothing to what ordinary statutory interpretation '
  +'and judicial review would achieve anyway. This outcome is inconsistent with '
  +'the Constitution as a document of higher law.')),
pi(R(B('Syed Suhail shows a better way:'),R(' The "legitimate reasons" standard can be '
  +'extended to legislation without necessarily making courts into legislators — '
  +'it requires governments to justify their decisions on principled grounds, '
  +'not merely to identify a plausible purpose. This is '),I('judicially'),R(' workable.')),

H2('V.  Conclusion'),
p(R('The statement is substantially valid — the exclusive application of the RCT to Art 12(1) '
  +'has unjustifiably limited its scope by: (i) collapsing two textual limbs into one test; '
  +'(ii) applying that test at minimal rationality level; and (iii) perpetuating circular '
  +'reasoning that makes the test nearly impossible to fail. The limitation is not entirely '
  +'unjustifiable (institutional competence concerns are real) but is '),B('calibrated too far '
  +'in the direction of deference'),R('. The courts should develop, '
  +'through the Syed Suhail "legitimate reasons" standard and TSK\'s rejection of the presumption '
  +'of constitutionality, a more demanding but still institutionally grounded approach — '
  +'requiring governments to identify, and justify, the actual purposes behind discriminatory '
  +'classifications, especially where fundamental liberties are at stake.')),

purpBox([
  lbl('★  STRATEGIC ADVICE (Purple) — Essay Technique for Q3','7030A0'),
  bl(PRPB('STRUCTURE:'),PRP(' The examiner explicitly flagged four required elements: '
    +'(a) scope of Art 12(1); (b) the RCT; (c) whether RCT limits scope; (d) whether '
    +'justifiable. Each must be addressed. Scripts that only describe the RCT and cases '
    +'will score C-band at most.')),
  bl(PRPB('MOST VALUABLE POINTS:'),PRP(' (1) EBL vs EPC distinction — CSK\'s critique '
    +'of LMS conflation; (2) Circularity in purpose identification; (3) Concrete example '
    +'(s 377A under LMS vs Syed Suhail — show how results differ). The examiner '
    +'specifically required a concrete example — students who omit this lose marks.')),
  bl(PRPB('DO NOT:'),PRP(' Evaluate the tests "purely on the basis of free-standing moral '
    +'arguments" (examiner warning). All evaluative points must be anchored in case law '
    +'and constitutional doctrine.')),
]),

// ═══════════════════════════════════════════════════════════════════════════
PB(),
H1('AY2022–23  Q5 — Art 9(1): Implications and Validity'),

H2('Question'),
p(R('"[T]he words \'life or personal liberty\' in Art 9(1) refer only to freedom from unlawful '
  +'deprivation of life and unlawful detention or incarceration. Such a restrictive reading '
  +'of Art 9(1) is supported by the text, structure and history of the provision." '
  +(CL('Tan Seng Kee v AG'),R(' [2022] SGCA 16 at para 247.'))),
p(R('Critically discuss the '),B('implications'),R(' and '),B('validity'),R(' of such '
  +'interpretation in relation to the right to life and personal liberty in accordance '
  +'with the law, bearing in mind the approach of the Singapore court towards constitutional '
  +'interpretation.')),

pinkBox([
  lbl('Examiner Feedback — Q5 (AY22-23)','9B1F6E'),
  bl(R('✓ The question requires assessment of Art 9(1) COMPREHENSIVELY: both "life or personal '
    +'liberty" AND "in accordance with the law." Most scripts dealt with the former '
    +'but not the latter — "perplexing as the question clearly stated the need to '
    +'discuss both aspects."')),
  bl(R('✓ Must engage with the interpretive METHODS (not merely describe outcomes). '
    +'"Many scripts merely described outcomes without carefully engaging with the '
    +'interpretive approaches that shaped the court\'s reasoning."')),
  bl(R('✓ Must address IMPLICATIONS (scope of protection) AND VALIDITY (whether '
    +'reasoning is justified). These are DISTINCT tasks.')),
  bl(RED('✗ Fatal error: Characterising TSK as a "strict textualist approach" and '
    +'concluding it was a backward step from YVK. "This analysis and conclusion '
    +'demonstrate the sheer failure in understanding the jurisprudence holistically." '
    +'TSK uses historical and structural analysis — consistent with YVK but more cautious.')),
  bl(RED('✗ Many scripts failed to grasp what "implications" and "validity" mean — '
    +'"Implications" = scope of protection; "Validity" = whether the court\'s method '
    +'and reasoning are justified. These require distinct treatment.')),
]),
SP(),

H2('Thesis'),
p(R('The TSK passage is best understood as a '),B('historically and structurally grounded '
  +'restatement of the minimum scope of Art 9(1)'),R(', not as a retreat to strict textualism. '
  +'Its '),B('implications'),R(' are significant — it confirms that Art 9(1) does not protect '
  +'privacy, autonomy, or dignity, limiting its protective scope to physical deprivation '
  +'of life and physical detention/incarceration; and that "in accordance with law" incorporates '
  +'FRNJ and an absurdity/arbitrariness threshold, but no more. The '),B('validity'),R(' of '
  +'this interpretation is defensible as an exercise in principled purposive analysis '
  +'anchored in constitutional text, structure, and history — but is vulnerable to the '
  +'critique that it produces a constitutionally underperforming right, inconsistent with '
  +'the Ong Ah Chuan mandate to give Part IV liberties a "generous interpretation."')),

H2('I.  Methodological Preliminary: How Should We Read the TSK Interpretation?'),
p(R('The examiner\'s warning is clear: TSK should NOT be characterised as "strict textualist." '
  +'The CA\'s approach in TSK combined:')),
pi(B('Textual analysis:'),R(' The words "life or personal liberty" — their ordinary '
  +'grammatical meaning contextualised within Art 9\'s structure.')),
pi(B('Structural analysis:'),R(' Art 9(2)-(6) provide procedural safeguards for '
  +'arrested/detained persons — this structure implies Art 9(1) primarily concerns '
  +'deprivation of physical liberty, not broader autonomy interests.')),
pi(B('Historical analysis:'),R(' Art 9(1) derives from Art 21 of the Indian Constitution, '
  +'which in turn was modelled on the Magna Carta. India\'s framers '),I('consciously'),R(' '
  +'rejected the wider US "due process" formulation. Singapore\'s adoption of the '
  +'Indian formulation imports this conscious rejection.')),
pi(B('Purposive analysis:'),R(' The Wee Commission Report (1966) explicitly rejected '
  +'incorporating a constitutional prohibition against inhuman punishment. This rejection '
  +'is treated as determinative of the framers\' intent regarding Art 9\'s scope.')),
p(R('This is a '),B('multi-modal purposive interpretation'),R(' — not strict textualism. '
  +'The court reached a narrow outcome through rich contextual, historical, and structural '
  +'reasoning. The question of '),I('validity'),R(' is therefore a question about whether '
  +'this multi-modal reasoning is correctly applied — not whether the court should have '
  +'done textualism at all.')),

H2('II.  Implications — Scope of Protection under Art 9(1)'),
H3('(A) "Life or Personal Liberty" — The Confirmed Minimum Scope'),
p(R('After '),CL('Tan Seng Kee'),R(', the scope of "life or personal liberty" is confirmed as:')),
pi(R('(i) Protection against '),B('unlawful deprivation of life'),R(' — including, per '
  +CL('Yong Vui Kong v PP'),R(' [2015], the unlawful use of physical force against '
  +'bodily integrity (extending to punishment such as caning).')),
pi(R('(ii) Protection against '),B('unlawful detention or incarceration'),R(' — the '
  +'classical habeas corpus territory, enforceable through Art 9(2).')),
pi(R('(iii) The protection is engaged only where there is '),B('actual or imminent '
  +'deprivation'),R(' — not mere chilling effects ('),CL('Tan Seng Kee'),R(' on s 377A).')),
p(R('What is '),B('excluded'),R(' from Art 9(1)\'s scope (confirmed in TSK):')),
pi(R('The right to privacy and personal autonomy ('),CL('Lim Meng Suang'),R(' (CA))')),
pi(R('The right to conduct one\'s life free of criminalisation absent physical restraint')),
pi(R('Unenumerated substantive rights not derivable from text, structure, or history '
  +'of the Constitution (YVK [2015] at [73]-[75] — courts cannot act as super-legislature)')),

H3('(B) Structural Implication — Relationship with Art 13'),
p(R('Art 13 protects "freedom of movement" — the right to move freely throughout Singapore '
  +'and to enter/leave. If Art 9(1) is limited to physical detention/incarceration, '
  +'and Art 13 separately protects movement, what work does Art 9(1) do that Art 13 does not?')),
amberBox([
  lbl('EVALUATIVE — Does the narrow reading of Art 9(1) render it redundant with Art 13?','C55A11'),
  bl(R('Argument: If Art 9 covers only physical detention and Art 13 covers freedom of movement, '
    +'they occupy nearly the same domain (detention = deprivation of movement). On this '
    +'reading, Art 9(1) adds little to the constitutional framework that Art 13 does not '
    +'already provide — a supreme law provision should do more work than to duplicate '
    +'an adjacent provision.')),
  bl(R('Counter (TSK): Art 9(1) is not redundant because it establishes the '),B('general '
    +'constitutional principle'),R(' that deprivations of life and personal liberty must '
    +'comply with "law" — specifically law incorporating FRNJ and the absurdity standard. '
    +'Art 13 provides the specific liberty; Art 9(1) provides the constitutional '
    +'quality-control standard for any law restricting that liberty. They are conceptually '
    +'distinct.')),
  bl(B('Better view:'),R(' The overlap argument is a powerful doctrinal prompt suggesting '
    +'Art 9(1) was meant to have independent substantive scope beyond Art 13\'s domain. '
    +'A purposive reading of the Part IV structure should give each provision independent '
    +'content — this supports a somewhat broader reading of "life or personal liberty" '
    +'than the TSK minimum.'))),
]),

H3('(C) Implication for "In Accordance with Law"'),
p(R('The TSK reading of "in accordance with law" produces the following sub-rules:')),
pi(B('(a) FRNJ:'),R(' The statute must comply with fundamental rules of natural justice — '
  +'specifically the right to a fair hearing (audi alteram partem) and the rule against '
  +'bias (nemo judex in re sua), as established in '),CL('Ong Ah Chuan v PP'),R(' [1981].')),
pi(B('(b) Colourability:'),R(' The statute cannot be targeted legislation designed to '
  +'secure the conviction of particular named individuals ('),CL('Liyanage v R'),R(').')),
pi(B('(c) Absurdity/Arbitrariness:'),R(' The statute cannot be so absurd or arbitrary '
  +'"that it could not possibly have been contemplated by our constitutional framers" '
  +'('),CL('Yong Vui Kong (MDP)'),R(' [2010]).')),
pi(B('(d) Rule of law:'),R(' The statute cannot contravene the rule of law — though '
  +'the precise content of this requirement in Art 9(1) remains underspecified.')),
amberBox([
  lbl('EVALUATIVE — Is the "in accordance with law" analysis adequate? Is FRNJ frozen at 1963?','C55A11'),
  bl(R('Critical implication of freezing FRNJ at the 1963 common law baseline: '
    +'In '),CL('Jumaat bin Mohamed Sayed v AG'),R(' [2023], the CA held that FRNJ does '
    +'NOT include the presumption of innocence at any particular stringency level, '
    +'the Balance of Probabilities Rule, or the More Probable Case Rule. What Lord '
    +'Diplock held in 1980 in '),CL('Ong Ah Chuan'),R(' "stands as the law today."')),
  bl(R('This means: regardless of how international human rights law and common law '
    +'criminal procedure standards have evolved since 1963, Art 9(1)\'s "in accordance '
    +'with law" remains pegged to a historical baseline that cannot accommodate '
    +'contemporary developments. The "living tree" constitutional approach (Canadian: '
    +CL('R v Big M Drug Mart'),R(') — specifically rejected in Singapore in favour '
    +'of a fixed-intent approach.')),
  bl(B('Critique:'),R(' A constitution made to endure cannot remain frozen at its '
    +'commencement. Lord Diplock himself in '),CL('Haw Tua Taw'),R(' suggested FRNJ '
    +'might develop over time. Rejecting this leads to a situation where the '
    +'constitutional standard for a fair trial becomes more anachronistic '
    +'with each passing decade — antithetical to the role of a supreme law.'))),
]),

H2('III.  Validity — Is the TSK Interpretation Constitutionally Justified?'),
H3('(A) Arguments for Validity'),
p(R('(i) '),B('Fidelity to constitutional intent (originalism):'),R(' The Wee Commission\'s '
  +'rejection of an express inhuman punishment prohibition, Singapore\'s adoption of the '
  +'Indian Art 21 formulation (not the US due process clause), and the structure of '
  +'Art 9(2)-(6) (all concerned with arrested/detained persons) collectively provide '
  +'strong '),I('a contrario'),R(' evidence that the framers did not intend Art 9(1) '
  +'to encompass broad autonomy or privacy rights. Purposive analysis endorses judicial '
  +'restraint where the framers\' negative intent is clear.')),
p(R('(ii) '),B('Separation of powers:'),R(' Courts creating unenumerated substantive rights '
  +'under Art 9 would be "enacting their personal views of what is just and desirable '
  +'into law, which is not only undemocratic but also antithetical to the rule of law" '
  +'(YVK [2015] at [73]). The court\'s constitutional role is to interpret, not to '
  +'supplement, the Constitution.')),
p(R('(iii) '),B('Consistency with Ong Ah Chuan\'s FRNJ framework:'),R(' The TSK '
  +'interpretation preserves and applies the established FRNJ framework — not abandoning '
  +'it. It gives "in accordance with law" substantive content (procedural fairness, '
  +'anti-absurdity, anti-colourability) that goes beyond pure positivism. This is '
  +'not a maximal reading but neither is it an empty one.')),
H3('(B) Arguments Against Validity'),
p(R('(i) '),B('Inconsistency with the generous interpretation mandate:'),R(' In '),
  CL('Ong Ah Chuan'),R(', Lord Diplock warned against interpreting Part IV liberties '
  +'through "the austerity of tabulated legalism." The TSK minimum scope — physical '
  +'detention and force, nothing else — is precisely the kind of tabulated, formalistic '
  +'minimum that this warning targets. A Constitution that aspires to protect "life '
  +'or personal liberty" as supreme law should generate more protective outcomes '
  +'than a reading that leaves autonomy, dignity, and privacy entirely unprotected.')),
p(R('(ii) '),B('Comparative isolation:'),R(' India ('),CL('Maneka Gandhi v Union of India'),R(' '
  +'[1978]) expanded Art 21 dramatically to include livelihood, dignity, and fair procedure '
  +'in administrative action. Malaysia ('),CL('Tan Tek Seng v Suruhanjaya Perkhidmatan '
  +'Pendidikan'),R(') has recognised personal liberty as encompassing the right to '
  +'livelihood. If Singapore\'s Art 9(1) traces the same historical lineage as these '
  +'provisions (Magna Carta → Indian Constitution), the far narrower Singapore '
  +'reading requires more persuasive justification than merely pointing to the '
  +'Wee Commission rejection of one specific extension (inhuman punishment).')),
p(R('(iii) '),B('FRNJ\'s frozen content undermines constitutional evolution:'),R(' '
  +'Constitutional guarantees must be capable of responding to evolving understanding '
  +'of justice. A static FRNJ baseline dated to 1963 will become progressively '
  +'more inadequate as criminal procedure develops. This is not a reason for courts '
  +'to invent new rights — but it is a reason for the courts to acknowledge that '
  +'the FRNJ content should at minimum be assessed against the full body of '
  +'Singapore\'s own common law development, not merely Lord Diplock\'s 1980 '
  +'statement of what the 1963 baseline contained.')),

H2('IV.  Synthesising Implications and Validity — The Overall Assessment'),
p(R('The TSK interpretation is '),B('constitutionally defensible but normatively incomplete.'),R(' '
  +'It represents a careful, multi-modal purposive analysis that reaches a restrained conclusion '
  +'consistent with constitutional design choices. The court is right to resist reading '
  +'unenumerated rights into Art 9(1) through judicial legislation. The "in accordance with law" '
  +'analysis provides real but narrow constitutional protection — not pure positivism, but '
  +'not substantive due process either.')),
p(R('However, the interpretation produces a constitutionally underperforming provision. Art 9(1), '
  +'as read in TSK, adds relatively little to what common law habeas corpus and judicial review '
  +'of procedural fairness would achieve independently. A supreme law provision of this '
  +'significance, sitting in a Constitution declared supreme by Art 4, should in principle '
  +'do more than provide a marginally elevated standard of procedural review for deprivations '
  +'of physical liberty. The generous interpretation mandate from '),CL('Ong Ah Chuan'),R(' '
  +'has not been given effect — the result is constitutional promise without constitutional '
  +'performance.')),
p(R('The most defensible reform would not be to abandon the TSK framework but to: '
  +'(a) acknowledge that FRNJ should be assessed against the '),I('current'),R(' body of '
  +'Singapore common law, not merely the 1963 baseline; and (b) to give the rule '
  +'of law requirement in "in accordance with law" sufficiently robust content to '
  +'constrain egregiously arbitrary legislation — moving beyond the ultra-high '
  +'absurdity threshold currently required. Both reforms are internally consistent '
  +'with the purposive methodology TSK itself employs.')),

purpBox([
  lbl('★  STRATEGIC ADVICE (Purple) — Essay Technique for Q5 (AY22-23)','7030A0'),
  bl(PRPB('CRITICAL STRUCTURE:'),PRP(' This question explicitly requires two distinct analytical '
    +'tasks: (1) IMPLICATIONS and (2) VALIDITY. Many students conflated them or only '
    +'addressed one. '
    +'Implications = what the TSK interpretation means for the scope of Art 9(1) in practice. '
    +'Validity = whether the court\'s interpretive method and reasoning are constitutionally '
    +'justified.')),
  bl(PRPB('DO NOT characterise TSK as "strict textualism"'),PRP(' — this is the single most '
    +'heavily criticised error in the examiner feedback. The court engaged text, structure, '
    +'and history — a multi-modal purposive approach that happened to reach a narrow outcome.')),
  bl(PRPB('"IN ACCORDANCE WITH LAW" is mandatory'),PRP(' — most scripts only addressed '
    +'"life or personal liberty." The FRNJ, absurdity, and rule of law content of '
    +'"in accordance with law" must be discussed. Frozen-FRNJ critique (Jumaat) is '
    +'the highest-value evaluative point here.')),
  bl(PRPB('STRUCTURE ARGUMENT:'),PRP(' The redundancy argument (Art 9 vs Art 13 overlap) '
    +'is a sophisticated structural point that examiners reward. If Art 9 covers the same '
    +'ground as Art 13, the provision is constitutionally redundant — a purposive reading '
    +'of the structure should prevent this by giving Art 9 independent scope.')),
  bl(PRPB('THEORY OF INTERPRETATION:'),PRP(' Frame your entire evaluation around a '
    +'clearly articulated interpretive theory (e.g., purposive interpretation as the '
    +'dominant Singapore method per s 9A Interpretation Act and Tan Cheng Bock). '
    +'Then assess whether TSK\'s approach is consistent with that theory. '
    +'This is what examiners mean by "a clearly articulated and justified theory of '
    +'constitutional interpretation" — and it is what distinguishes A-band answers.')),
]),

// ── END ────────────────────────────────────────────────────────────────────
HR(),
p(B('END OF MODEL ANSWERS — AY2020–21 Q3, Q5  |  AY2022–23 Q3, Q5')),
p(R('Colour key: Black = main argument  |  '),
  new TextRun({text:'Purple',font:'Arial',size:22,color:'7030A0',bold:true}),
  R(' = strategic/remedies  |  '),
  new TextRun({text:'Amber',font:'Arial',size:22,color:'C55A11',bold:true}),
  R(' = evaluative turning points  |  '),
  new TextRun({text:'Blue italic',font:'Arial',size:22,color:'1F4E79',italics:true}),
  R(' = case citations')),
];

// ── build doc ───────────────────────────────────────────────────────────────
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
       run:{size:22,bold:true,font:'Arial',color:'4A235A'},
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
  fs.writeFileSync('/home/claude/CAAL_ModelAnswers_Set2.docx', buf);
  console.log('Done!');
}).catch(e => { console.error(e); process.exit(1); });
