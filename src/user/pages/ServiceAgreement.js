import React from 'react'
import { Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import LoadingSpinner from '../../shared/UIElements/LoadingSpinner/LoadingSpinner'
import Modal from '../../shared/UIElements/Modal/Modal'
import { useHttp } from '../../shared/hooks/http-hook'

import classes from './css/ServiceAgreement.module.css'

const ServiceAgreement = () => {
  const { handleSubmit, register } = useForm()
  const navigate = useNavigate()
  const { uid, token } = useSelector((s) => s.userData)
  const { sendRequest, error, clearError, isLoading } = useHttp()

  const onSubmit = async (data) => {
    try {
      await sendRequest(`service_agreement/${uid}`, 'POST', data, {
        Authorization: `Bearer ${token}`,
      })
      navigate('/lou')
    } catch (e) {
      throw new Error('Something went wrong, please try again!')
    }
  }
  return (
    <>
      <Modal
        open={error ? true : false}
        handleClose={clearError}
        modalDescription={error}
      />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.content}>
            <div className={classes.heading}>
              <h1>
                <u>E-SERVICE AGREEMENT</u>
              </h1>
            </div>
            <br />
            <div className={classes['first-page']}>
              THIS SERVICE AGREEMENT (“Agreement”), executed at West Bengal on
              the
              <input required type="date" {...register('excecutionDate')} />
              <br />
              Where as{' '}
              <select required {...register('nameTitle')}>
                <option>Mr.</option>
                <option>Miss.</option>
                <option>Mrs.</option>
              </select>
              <input
                required
                style={{ width: '500px' }}
                type="text"
                {...register('name')}
              />
              <select required {...register('title')}>
                <option>S/O</option>
                <option>W.O</option>
                <option>C/O</option>
                <option>D/O</option>
              </select>{' '}
              <input
                required
                style={{ width: '500px' }}
                type="text"
                {...register('title_of')}
              />
              DOB: <input required type="date" {...register('dob')} />, Address:{' '}
              <textarea
                required
                style={{ width: '500px' }}
                {...register('address')}
              />
              , State: <input required type="text" {...register('state')} />,
              Pincode –{' '}
              <input required type="number" {...register('pincode')} />
              , Mobile No:
              <input required type="text" {...register('mobile_no')} />, Email
              id: <input required type="email" {...register('email')} />, is
              hereinafter called and referred to as the party of the SECOND PART
              which expression shall unless excluded by or -repugnant to its
              context be demand to include his heirs, executors, administrators
              and assigns of the PARTY OF SECOND PART.
            </div>
            <br />
            <hr />
            <br />
            <div className={classes.inner}>
              <h3>WHEREAS:</h3>
              <ul>
                <li>
                  PARTY OF FIRST PART is engaged in the business of scanning of
                  all Govt. and Non Govt. official pages /forms and well as
                  entering the same in portal as referred the Governing bodies.
                </li>
                <li>
                  CENTER is engaged in the business of running a Bpo / Kpo
                  center, marketing activities at various location of India and
                  has represented to PARTY OF FIRST PART that it has the
                  requisite skill, knowledge, experiences, expertise,
                  infrastructure and capability to carry out the Data Updating
                  data Entry Work Process.
                </li>
                <li>
                  The Parties hereto wish to record the said terms and
                  conditions in writing.
                </li>
              </ul>
              <h3>NOW, THEREFORE, THIS AGREEMENT WITNESS AS FOLLOWS:</h3>
              <ul>
                <li>SCOPE OF SERVICE </li>
                <p>
                  The services to be provided hereunder by CENTER are more
                  particularly described in Annexure A annexed hereto.
                </p>
                <li>TERM</li>
                <p>
                  This Agreement shall come into force with effect from date of
                  Signing of this contract to shall be in force and effect till
                  16 months as under the terms provided hereunder. The Parties
                  can renew or enter into another agreement or may on or prior
                  to the expiry of the term aforementioned, mutually agree in
                  writing to extend this Agreement for a further period/s of
                  such duration as agreed by the Parties.
                </p>
                <li>CONSIDERATION</li>
                <p>
                  <strong>
                    PARTY OF SECOD PART shall pay consideration to CENTER
                  </strong>
                  for the services rendered, on terms as more particularly
                  described in Annexure B attached hereto. All payments shall be
                  made subject to deduction of all applicable taxes. CENTER
                  shall be solely liable for the payment of all existing
                  central, state and local levies, taxes, duties, fines and
                  penalties (including without limitation sales taxes, value
                  added taxes, excise duties and customs duties, if any and
                  excluding service tax which will be paid as applicable on
                  providing the service tax registration number), by whatever
                  name called, as may become due and payable in relation to the
                  services. Consideration to be revised annually on mutually
                  agreed terms.
                </p>
                <li>REPRESENTATIONS AND WARRANTIES BY CENTER :</li>
              </ul>
              <p>CENTER hereby represents and warrants that:</p>
              <ol start="a">
                <li>
                  It is in good standing and that it has full authority to enter
                  into this Agreement and subject to obtaining the necessary
                  approvals under the applicable law, to perform its obligations
                  hereunder according to the terms hereof.
                </li>
                <li>
                  It shall take adequate precautions not to breach the privacy
                  of potential customers to any third parties during the course
                  of performance of its obligations herein.{' '}
                </li>
                <li>
                  It has full power and authority to enter into this Agreement
                  and to take any action and execute any documents required by
                  the terms hereof; and that this Agreement, entered into has
                  been duly authorized by all necessary authorization
                  proceedings, has been duly and validly executed and delivered,
                  and is a legal, valid, and binding obligation of, enforceable
                  in accordance with the terms hereof; and that the executants
                  of this Agreement are duly empowered and authorized to execute
                  this Agreement and to perform all its obligations in
                  accordance with the terms herein.
                </li>
                <li>
                  No consent, approval, authorization, order, registration or
                  qualification of, or with, any court or regulatory authority
                  or other governmental body having jurisdiction over CENTER ,
                  the absence of which would adversely affect the legal and
                  valid execution, delivery and performance of this Agreement or
                  Documents and instruments contemplated hereby, is required.
                </li>
                <li>
                  Neither the execution nor delivery of this Agreement, the
                  consummation of the transactions contemplated hereby, or the
                  fulfillment of or compliance with the terms and conditions of
                  this Agreement, conflict with or result in a breach of or a
                  default under any of the terms, conditions or provisions of
                  any legal restriction (including, without limitation, any
                  judgment, order, injunction, decree or ruling of any court or
                  governmental authority, or any federal, state, local or other
                  law, statute, rule or regulation) or any covenant or agreement
                  or instrument to which it is a party, or by which CENTER or
                  any of the property of CENTER is bound, nor does such
                  execution, delivery, consummation or compliance violate or
                  result in the violation of its constitutional documents.
                </li>
                <h3>COVENANTS OF CENTER:</h3>
                <ul>
                  <li>
                    CENTER shall deploy and engage suitably experienced and
                    competent personnel as may reasonably be required for the
                    performance of the services.
                  </li>
                  <li>
                    CENTER shall withdraw or bar any of its employee/s from the
                    provision of the services, in the sole opinion of PARTY OF{' '}
                    <strong>FIRST PART:</strong>{' '}
                  </li>
                  <li>
                    The quality of services rendered by the said employee should
                    be in accordance with the quality specifications stipulated
                    by PARTY OF <strong>FIRST PART.</strong>
                  </li>
                  <li>
                    All employees engaged by CENTER shall be in sole employment
                    of CENTER and CENTER shall be solely responsible for their
                    salaries wages statutory payments etc. That under no
                    circumstances shall
                    <strong>PARTY OF FIRST PART</strong> be liable for any
                    payment or claim or compensation (including but not limited
                    to compensation on account of injury/death/termination) of
                    any nature to the employees and personnel of CENTER.
                  </li>
                </ul>
                <h3>Center</h3>
                <ul>
                  <li>
                    Shall be responsible for all negotiations with personnel
                    relating to salaries and benefits, and shall be responsible
                    for assessments and monitoring of performance and for all
                    disciplinary matters.
                  </li>
                  <li>
                    Shall not knowingly engage any person with a criminal
                    record/conviction and shall bar any such person from
                    participating directly or indirectly in the provision of
                    services under this Agreement.
                  </li>
                  <li>
                    Shall at all times use all reasonable CENTER to maintain
                    discipline and good order amongst its personnel.
                  </li>
                  <li>
                    Shall not exercise any lien on any of the assets, documents,
                    instruments or material belonging to
                    <strong>PARTY OF FIRST PART.</strong>
                  </li>
                  <li>
                    Shall regularly provide updates to{' '}
                    <strong>PARTY OF FIRST PART</strong> with respect to the
                    provision of the services and shall meet with the personnel
                    designated by <strong>PARTY OF FIRST PART</strong> to
                    discuss and review its performance at such intervals as may
                    be agreed between the Parties.x`
                  </li>
                  <li>
                    Shall be responsible for compliance of all laws, rules,
                    regulations and ordinances applicable in respect of its
                    employees, subcontractors and agents (including but not
                    limited to Minimum Wages Act, Provident Fund laws, Workmen's
                    Compensation Act) and shall establish and maintain all
                    proper records including, but not limited to, accounting
                    records required by any law, code, practice or corporate
                    policy applicable to it from time to time, including records
                    and returns as applicable under labour legislations.
                  </li>
                  <li>
                    Shall not violate any proprietary and intellectual property
                    rights of<strong>PARTY OF FIRST PART</strong> or any third
                    party, including without limitation, confidential
                    relationships, patent, trade secrets, copyright and any
                    other proprietary rights in course of providing services
                    hereunder
                  </li>
                  <li>
                    Shall ensure that the materials and services to be delivered
                    or rendered hereunder will be of the kind, quality and
                    timeliness designated as per the Quality and Annexure
                    Standards designated by
                    <strong>PARTY OF FIRST PART</strong> and communicated to
                    CENTER from time to time.
                  </li>
                  <li>
                    Shall not work in a manner which, in the reasonable opinion
                    of
                    <strong>PARTY OF FIRST PART</strong>, may be detrimental to
                    the interests of <strong>PARTY OF FIRST PART</strong> and
                    which may adversely affect the role, duties, functions and
                    obligations of CENTER as contemplated by this Agreement.
                  </li>
                  <li>
                    That CENTER shall be liable to
                    <strong>PARTY OF SECOND PART</strong>, for any and all loss
                    and expenses of any nature whatsoever arisen directly or
                    indirectly by negligence, dishonest, criminal or fraudulent
                    act of any of the representatives and employees while
                    providing the services to
                    <strong>PARTY OF FIRST PART</strong>.
                  </li>
                </ul>
                <li>
                  CENTER shall keep indemnified and harmless against any cost -
                  any expenses which may be incurred or suffered by due to loss
                  of data by CENTER or any of its employees / agents and CENTER
                  shall be liable for any such cost and expenses.{' '}
                </li>
                <li>
                  CENTER shall itself perform the obligations under this
                  Agreement and shall not assign, transfer or sub-contract any
                  of its rights and obligations under this Agreement except with
                  prior written permission of
                  <strong>PARTY OF FIRST PART</strong>
                </li>
              </ol>
              <h3>TRAINING:</h3>
              <p>
                <strong>PARTY OF FIRST PART</strong> will undertake to conduct
                product training for all agents’ personnel of CENTER providing
                service support to<strong>PARTY OF SECOND PART</strong> in
                services activity and other activities as agreed.
                <strong>PARTY OF FIRST PART</strong> shall also provide training
                to all new recruits who have been recruited for rendering the
                service support to the promotional exercise as and when they
                join.
                <strong>PARTY OF FIRST PART</strong> may also authorize / train
                CENTER to train the agent’s personnel.
              </p>
              <h3>CONFIDENTIALITY:</h3>
              <ol start="a">
                <li>
                  All product and process details, documents, data,
                  applications, software, systems, papers, statements and
                  business/customer information (hereinafter referred to as
                  ‘Confidential Information’) which may be communicated to
                  CENTER and /or its employees shall be treated as absolutely
                  confidential and CENTER irrevocably agrees and undertakes and
                  ensures that CENTER and its employees shall keep the same
                  secret and confidential and not disclose the same, in whole or
                  in part to any third party without the prior written
                  permission of PARTY OF FIRST PART, nor shall use or allow to
                  be used any information than as may be necessary for the due
                  performance of CENTER obligation hereunder. CENTER hereby
                  specifically agrees to indemnify and keep safe and harmless at
                  all times against all or any consequences arising out of any
                  breach of this undertaking by CENTER and/or its employees and
                  shall immediately reimburse and pay to PARTY OF FIRST PART on
                  demand all damages, loss, cost, expenses or any changes that
                  incur or pay in connection therewith.
                </li>
                <li>
                  CENTER agrees to take all necessary action to protect the
                  Confidential Information against:
                  <ul>
                    <li>
                      Misuse, loss, destruction, deletion and/or alteration.
                    </li>
                    <li>
                      Not to misuse or permit misuse directly or indirectly,
                      commercially exploit the Confidential Information for
                      economic or other benefit.
                    </li>
                  </ul>
                </li>
                <li>
                  Not to make or retain any copies or record of any Confidential
                  Information submitted by PARTY OF SECOND PART other than as
                  may be required for the performance of CENTER obligation under
                  this Agreement.
                </li>
                <li>
                  Notify<strong>PARTY OF FIRST PART</strong>, promptly of any
                  unauthorized or improper use or disclosure of the Confidential
                  Information.
                </li>
                <li>
                  Return all the Confidential Information that is in the custody
                  of CENTER upon termination/expiry of this Agreement.
                </li>
                <li>
                  CENTER hereby unconditionally agrees and undertakes that it
                  shall not and that its employees shall not disclose the terms
                  and conditions of this Agreement or disclose the information
                  under this Agreement to any third party unless such disclosure
                  is required by law or for the purpose of any Performing CENTER
                  obligations under this Agreement.
                </li>
                <li>
                  It shall be the incumbent duty of CENTER to undertake not to
                  disclose any business related information of PARTY OF FIRST
                  PART to any third person and CENTER shall keep all knowledge
                  of the business activities and affairs of PARTY OF FIRST PART,
                  strictly confidential and also to ensure that neither CENTER
                  nor any of its officers, employees directly or indirectly
                  assist any third person with the promotion of activities which
                  may be prejudicial to the interest or in competition to the
                  activities of PARTY OF FIRST PART.
                </li>
                <ul>
                  <li>
                    The provisions of this Clause shall survive the termination
                    of this Agreement.
                  </li>
                </ul>
              </ol>
              <h3>INDEMNITY:</h3>
              <ol>
                <li>
                  CENTER shall, at its own expense, indemnify, defend and hold
                  harmless and its officers, directors, employees,
                  representatives,agents respective directors, and assigns from
                  and against any and all liability (including but not limited
                  to liabilities, judgments, damages, losses, claims, costs and
                  expenses, including attorneys fees and expenses) any other
                  loss that may occur, arising from or relating to:
                </li>
                <ol start="1">
                  <li>
                    a breach, non-performance or inadequate performance by
                    CENTER of any of the terms, conditions, covenants,
                    representations, undertakings, obligations or warranties
                    under this Agreement;{' '}
                  </li>
                  <li>
                    the acts, errors, representations, misrepresentations,
                    willful misconduct or negligence of CENTER , its employees
                    in performance of its obligations under this Agreement; or
                  </li>
                  <li>Any deficiency in the services of CENTER. </li>
                </ol>
              </ol>
              <h3>CORPORATE AUTHORITY:</h3>
              <p>
                The Parties represent that they have taken all necessary
                corporate action to authorize the execution and consummation of
                this Agreement and will furnish satisfactory evidence of same
                upon request.
              </p>
              <h3>PUBLICITY</h3>
              <p>
                CENTER cannot use the name and/or trademark/logo of PARTY OF
                FIRST PART its group companies or associates in any sales or
                marketing publication or advertisement, or in any other manner.
              </p>
              <h3>INDEPENDENT ARRANGEMENT:</h3>
              <p>
                This Agreement is on a principal-to-principal basis between the
                Parties hereto. Nothing contained in this Agreement shall be
                construed or deemed to create any association, partnership or
                joint venture or employer-employee relationship or
                principal-agent relationship in any manner whatsoever between
                the parties. CENTER acknowledges that its rendering of services
                is solely within its own control, subject to the terms and
                conditions agreed upon and agrees not to hold itself out to be
                an employee, agent or servant of
                <strong>PARTY OF FIRST PART</strong> or Affiliate thereof.
              </p>
              <h3>RECORDS, INSPECTION AND RIGHT TO AUDIT:</h3>
              <p>
                That CENTER shall disclose to
                <strong>PARTY OF FIRST PART</strong> all information with regard
                to the sales and services and the activities performed by CENTER
                in relation to this Agreement and make available all records,
                data and information relating thereto as and when desired by
                <strong>PARTY OF FIRST PART</strong>.
              </p>
              <p>
                That CENTER shall permit designated employees/representatives of
                <strong>PARTY OF FIRST PART</strong> to enter upon the premises
                of CENTER, where the records relating to the sales and services
                are kept by CENTER for the inspection of all such documents and
                records including but not limited to the computer system and any
                other related information which may be required by
                <strong>PARTY OF FIRST PART</strong>.
              </p>
              <p>
                That CENTER shall keep complete and accurate account of all
                records in relation with this Agreement in the manner. CENTER
                forthwith upon being required by
                <strong>PARTY OF FIRST PART</strong> permit inspection, audit or
                permit taking copies of the records of CENTER which are relevant
                to this Agreement. CENTER shall co-operate in good faith with
                <strong>PARTY OF FIRST PART</strong>.{' '}
              </p>
              <p>
                In course of performing internal audit as specified by
                <strong>PARTY OF FIRST PART</strong>, if any observations made
                will have to be immediately brought to the notice of
                <strong>PARTY OF THE FIRST PART</strong> for advice on further
                action.
              </p>
              <h3>TERMINATION:</h3>
              <ol>
                <li>
                  It is hereby agreed and understood by the Parties that the
                  provisions of this Clause shall not limit or restrict nor
                  shall they preclude any Party from pursuing such further and
                  other legal actions, against the other Party for any breach or
                  non-compliance of the terms of this Agreement.
                </li>
                <li>
                  In the event that this Agreement can be terminated by giving
                  30 days notice by both the parties.
                </li>
                <li>
                  If CENTER fails to maintain login hours as per clause
                  continuously for the period of 1week, than the contract may be
                  terminated.
                </li>
                <li>
                  If CENTER fails in any clause mention in this agreement, than
                  this agreement will be terminated without any notices and
                  liability.
                </li>
              </ol>
              <h3>FORCE MAJEURE:</h3>
              <p>
                The Parties shall not be liable for any failure to perform any
                of its obligations under this Agreement if the performance is
                prevented, hindered or delayed by a Force Majeure event (defined
                below) and in such case its obligations shall be suspended for
                so long as the Force Majeure Event continues (provided that this
                shall not prevent the accrual of interest on a principal amount
                which would have been payable but for this provision). Each
                party shall promptly inform the other of the existence of a
                Force Majeure Event and shall consult together to find a
                mutually acceptable solution.
              </p>
              <p>
                “Force Majeure Event” means any event due to any cause beyond
                the reasonable control of the Party, including, without
                limitation, unavailability of any communication system,
                sabotage, fire, flood, explosion, acts of God, civil commotion,
                strikes or industrial action of any kind, riots, insurrection,
                war or acts of government.
              </p>
              <h3>PANALTY:</h3>
              <p>
                If any client data or information has been leaked by CENTER or
                its employees during the contract, than contract will terminate
                Id and penalty of Rs.1000000/-(Ten Lacks Indian Rupees only).
              </p>
              <h3>MISCELLANEOUS:</h3>
              <ul>
                <li>
                  Any provision of this Agreement may be amended or waived if,
                  and only if such amendment or waiver is in writing and signed,
                  in the case of an amendment by each Party, or in the case of a
                  waiver, by the Party against whom the waiver is to be
                  effective.
                </li>
                <li>
                  No failure or delay by any Party in exercising any right,
                  power or privilege hereunder shall operate as a waiver thereof
                  nor shall any single or partial exercise of any other right,
                  power or privilege. The rights and remedies herein provided
                  shall be cumulative and not exclusive of any rights or
                  remedies provided by law.
                </li>
                <li>
                  The provisions of this Agreement shall be binding upon and
                  inure to the benefit of the Parties hereto and their
                  respective successors and permitted assigns.
                </li>
                <li>
                  Unless otherwise provided herein, all notices or other
                  communications under or in connection with this Agreement
                  shall be given in writing and may be sent by personal delivery
                  or post or courier or facsimile. Any such notice or other
                  communication will be deemed to be effective if sent by
                  personal delivery, when delivered, if sent by post, two days
                  after being deposited in the post and if sent by courier, one
                  day after being deposited with the courier, and if sent by
                  facsimile, when sent (on receipt of a confirmation to the
                  correct facsimile number).{' '}
                </li>
                <li>
                  This Agreement constitutes the entire agreement between the
                  Parties with respect to the subject matter hereof and
                  supersedes all prior written agreements, understandings and
                  negotiations, both written and oral, between the Parties with
                  respect to the subject matter of this Agreement. No
                  representation, inducement, promise, understanding, condition
                  or warranty not set forth herein has been made or relied upon
                  by any Party hereto.
                </li>
                <li>
                  Neither this Agreement nor any provision hereof is intended to
                  confer upon any Person other than the Parties to this
                  Agreement any rights or remedies hereunder.
                </li>
                <li>
                  In connection with this Agreement, as well as all transactions
                  contemplated by this Agreement, each Party agrees to execute
                  and deliver such additional documents and to perform such
                  additional actions as may be necessary, appropriate or
                  reasonably requested to carry out or evidence the transactions
                  contemplated hereby
                </li>
                <li>
                  The invalidity or unenforceability of any provisions of this
                  Agreement in any jurisdiction shall not affect the validity,
                  legality or enforceability of the remainder of this Agreement
                  in such jurisdiction or the validity, legality or
                  enforceability of this Agreement, including any such
                  provision, in any other jurisdiction, it being intended that
                  all rights and obligations of the Parties hereunder shall be
                  enforceable to the fullest extent permitted by law.
                </li>
                <li>
                  The captions herein are included for convenience of reference
                  only and shall be ignored in the construction or
                  interpretation hereof.
                </li>
                <li>
                  This Agreement together with all Annexure hereto forms a
                  single Agreement between the Parties hereto.
                </li>
                <li>
                  This Agreement has been signed in duplicate, each of which
                  shall be deemed to be an original.
                </li>
                <li>
                  Neither Party may assign, in whole or in part, the benefits or
                  obligations of this Agreement to any other person without the
                  prior written consent of the other Party, such consent not to
                  be unreasonably withheld.
                </li>
              </ul>
              <hr />
              <br />
              <h1>
                <u>Annexure A</u>
              </h1>
              <p>
                <select required {...register('annexureName_title')}>
                  <option>Mr.</option>
                  <option>Miss.</option>
                  <option>Mrs.</option>
                </select>
                <input
                  required
                  style={{ width: '300px' }}
                  type="text"
                  {...register('annexureName')}
                />
                , India, are appointed by PARTY OF FIRST PART to perform their
                Data Updating data Entry process.{' '}
              </p>
              <ul>
                <li>Day shift work</li>
                <li>All the agents must Good in Computers.</li>
                <li>
                  All the Systems (Computers) which will be used to run this
                  data processing work should disable right click option, USB
                  drives, CD/DVD Roms, and all copying commands in System.
                </li>
                <li>
                  CENTER will ban all the usage of mobile’s and Electronic
                  devices of agents, TLs, and manager inside the Center even
                  after the shift timing over.
                </li>
                <li>
                  If the CENTER not able to provide accurate work with 100%
                  accuracy than the said data will be resented to CENTER to
                  re-perform the work.
                </li>
                <li>
                  Unlimited work load will be provided by the first party.
                </li>
                <li>
                  Center should be co-operate as working on Sunday or any
                  holidays based on request & requirement of the
                  <strong>PARTY OF FIRST PART</strong>.
                </li>
                <li>
                  Center should submit the work as per request on first party as
                  urgent needed from first party.{' '}
                </li>
                <li>
                  Both parties should be agreed for doing work mutual
                  understanding till the duration of agreement.
                </li>
                <li>
                  <h3>
                    Users are advised not to LOG-IN in SUNDAYS & PUBLIC
                    HOLIDAYS.
                  </h3>
                </li>
              </ul>
              <h2>
                CENTER has to sub limit the daily reports at end of the day as
                per training given.{' '}
              </h2>
              <h3>
                TECHNICAL GUIDELINES TO BE FOLLOWED BY THE USER OR CENTERS OR
                PARTY OF SECOND PART:
              </h3>
              <p>
                <u>PART - A </u>
              </p>
              <ol start="1">
                <li>ALL FIELDS SHOULD BE FILLED ACCURATELY.</li>
                <li>
                  OUTPUT MUST BE DONE AS PER INPUT FILES AND NO COMPROMISE IN
                  QUALITY.
                </li>
                <li>
                  IF ANY FILED MISSED THEN USER HAVE TO CLICK ON “END SESSION”
                  OPTION AND HAVE TO STOP THE WORK FOR THE DAY.
                </li>
                <li>
                  NO OTHER ALTERNATIVE WORDS / DIGIT WILL BE ACCEPTED OTHER THAN
                  GIVEN IN INPUT FILES DATA WHILE ENTERING THE DATA.
                </li>
                <li>
                  FREQUENT MISTAKES WILL NOT BE ACCEPTED IN OUTPUT FILES AND
                  SUBMISSION OF DATA.
                </li>
                <li>
                  THERE IS NO DEDUCTION FOR BAD QUALITY BUT THE WRONG FORM
                  SUBMITTED WILL NOT BE CONSIDERED AS IN INVOICE OR WILL BE NOT
                  ELIGIBLE FOR PAYOUT.
                </li>
              </ol>
              <p>
                <u>PART - B (NEW REGISTRATION DETAILS)</u>
              </p>
              <ol start="1">
                <li>
                  NEW USER AFTER ENROLLING WILL RECEIVE A LINK WHERE THE USER
                  HAS TO FIRST REGISTER AS A NEW MEMBER.
                </li>
                <li>
                  ONCE USER IS REGISTERED ALL DETAILS WILL BE RECORDED WITH
                  PARTY OF THE FIRST PART.
                </li>
                <li>
                  AFTER VERFICATION OF THE USER DETAILS, SERVER PASSWORD WILL BE
                  GENERATED FOR THE USER FOR NEXT STEP.
                </li>
                <li>
                  AFTER DOING LOG-IN USER WILL STEP FORWARD TO VERIFICATION PAGE
                  WHERE USER NEEDS TO ENTER SERVER PASSWORD.
                </li>
                <li>
                  SERVER PASSWORD WILL BE ALLOTED BY THE PARTY OF FIRST PART TO
                  THE USER AFTER VERFICATION.
                </li>
              </ol>
              <p>
                <u>PART - C (FORM FILLING PAGE ENTRIES DETAILS)</u>
              </p>
              <ol start="1">
                <li>
                  ONCE USER HAS ENTERED THE FORM FILLING PAGE POP-UP BOX WILL
                  APPEAR.
                </li>
                <li>USER HAS TO FILL THE DETAILS IN THE POP-UP BOX.</li>
                <li>FOR EVERY FIELD POP-UP BOX WILL APPEAR.</li>
                <li>
                  AFTER ENTERING DETAILS OF THE PARTICUAR FILED IN THE POP-UP
                  BOX USER HAS TO CLICK ON “OK” OPTION.
                </li>
                <li>
                  ONCE PRESSED THE “OK” OPTION BY USER THE PARTICULAR FIELD WILL
                  BE UPLODAED IN SERVER AND WILL BE LOCKED.
                </li>
                <li>
                  ALL FILED IN THE FORM IS NON-EDITABLE SO USER NEED FILL
                  CORRECTLY AS PER DATA.
                </li>
                <li>
                  AFTER FILLING ALL DETAILS COMPLETELY USER HAS TO CLICK ON
                  SUBMIT OPTION GIVEN BELOW.
                </li>
                <li>
                  AFTER CLICKING ON SUBMIT OPTION, ALL DETAILS WILL BE RECORDED
                  IN THE PORTAL.
                </li>
                <li>
                  ONCE CLICKED ON “CONTINUE” USER WILL REDIRECTED BACK TO FORM
                  FILLING PAGE.
                </li>
                <li>
                  ENTRIES SAVED WILL BE AUTOMATICALLY FORWARDED TO GOVT. PORTAL
                  FOR VERFICATION, QC & BILLING PURPOSE.
                </li>
                <li>ENTRIES SHOULD BE DONE AS PER DATA SHEET GIVEN. </li>
                <li>
                  ANY ALTERATION OR CHANGES MADE IN FORMAT WILL BE CONSIDERED AS
                  AN ERROR AND NO PAYOUT WILL BE MADE FOR THAT PARTICULAR FORM.
                </li>
              </ol>
              <p>
                <u>
                  PART - D (AVAILABLITY OF SERVER, SERVER PASSOWORD & CLOSE
                  SESSION DETAILS)
                </u>
              </p>
              <ol>
                <li>
                  USERS ARE REQUIRED NOT TO CLICK ON “CLOSE SESSION” OR “LOG
                  OUT” OPTION AT THE FORM FILLING PAGE IN BETWEEN 11:00 AM –
                  05:00 PM UNTILL THE WORK IS NOT ACCOMPLISHED.
                </li>
                <li>
                  ONLY ONE SERVER PASSWORD WILL BE ALLOTTED DURING THE 11:00 AM
                  – 12:00 PM.
                </li>
                <li>
                  IF ANY USER INTENTIONALLY OR UN-INTENTIONALLY CLICK ON CLOSE
                  SESSION / LOG-OUT OR USER SYSTEM GETS CLOSED DUE TO POWER
                  FAILURE OR ANY OTHER CIRCUMSTANCES IN THAT CASE AGAIN SERVER
                  PASSWORD WILL BE GIVEN ON NEXT DAY IN BETWEEN 11:00 AM – 12:00
                  PM.
                </li>
                <li>USERS ARE REQURIED TO INFORM THE CENTER ABOUT THE SAME.</li>
                <li>
                  USERS ARE ADVISED NOT TO CLICK ON “BACK BUTTON” OR “REFRESH”
                  THE PAGE IF DONE, ALL DATA WILL BE LOST AND SERVER PASSWORD
                  WILL BE PROMPTED. IN THAT CASE AGAIN SERVER PASSWORD WILL BE
                  GIVEN ON NEXT DAY IN BETWEEN 11:00 AM – 12:00 PM.
                </li>
                <li>
                  USERS ARE ADVISED NOT TO ENTER ANY RECORDS IN BETWEEN 05:00
                  PM. – 11:00 AM. SERVER WILL REMAIN CLOSED.
                </li>
                <li>
                  IN FESTIVALS OR PUBLIC HOLIDAYS SERVER WILL BE REMAINED CLOSED
                  AND WILL BE NOTIFIED BY COMPANY VIA EMAIL.
                </li>
                <li>
                  USERS ARE ADVISED NOT TO LOG-IN DURING THE BUFFERING TIME
                  05:00 PM – 11:00 AM.
                </li>
                <li>
                  USERS NEED TO CLICK ON LOG-OUT OR END SESSION OPTION AT 05:00
                  PM AFTER THE SHIFT IS OVER ON DAILY BASIS.{' '}
                </li>
              </ol>
              <footer className={classes.footer}>
                <h1>Signature</h1>
                <input required type="text" {...register('signature')} />{' '}
                <p className="center">***END OF AGREEMENT***</p>
              </footer>
            </div>
            <div className="center" style={{ marginTop: '1rem' }}>
              <Button variant="contained" type="submit">
                Accept
              </Button>
            </div>
          </div>
        </form>
      )}
    </>
  )
}

export default ServiceAgreement
