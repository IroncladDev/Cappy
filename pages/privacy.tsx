import Footer from "app/components/Footer";
import { rcss, tokens } from "app/tokens";
import Text from "app/components/Text";

function Section({
  title,
  id,
  paragraphs,
}: {
  title?: string;
  paragraphs: string[];
  id?: string;
}) {
  return (
    <div
      css={[
        rcss.flex.column,
        rcss.colWithGap(16),
        rcss.p(16),
        rcss.borderRadius(8),
        {
          background: tokens.backgroundDefault,
        },
      ]}
    >
      {title ? (
        <Text variant="subheadBig" multiline id={id}>
          {title}
        </Text>
      ) : null}

      <div css={[rcss.flex.column, rcss.colWithGap(8)]}>
        {paragraphs.map((paragraph, i) => (
          <Text key={i} color="dimmer" multiline>
            {paragraph}
          </Text>
        ))}
      </div>
    </div>
  );
}

export default function Privacy() {
  return (
    <div>
      <div
        css={[
          rcss.minHeight("100vh"),
          rcss.flex.column,
          rcss.center,
          rcss.pt(64),
        ]}
      >
        <div
          css={[
            rcss.flex.column,
            rcss.colWithGap(16),
            rcss.maxWidth(tokens.maxBodyWidth),
            rcss.py(64),
          ]}
        >
          <Text variant="headerDefault">Privacy Policy</Text>
          <Text
            variant="subheadDefault"
            css={{ color: tokens.foregroundDimmer }}
          >
            Last updated August 14, 2023
          </Text>

          <Section
            paragraphs={[
              `This privacy notice for Liberty Cappy ("**Company**," "**we**," "**us**," or "**our**"), describes how and why we might collect, store, use, and/or share ("process") your information when you use our services ("Services"), such as when you:`,
              ` - Visit our website at https://libertycappy.com, or any website of ours that links to this privacy notice
 - Engage with us in other related ways, including any sales, marketing, or events`,
              `**Questions or concerns?** Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at libertycappy@gmail.com.`,
            ]}
          />

          <Section
            title="Summary of Key Points"
            paragraphs={[
              `*This summary provides key points from our privacy notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.*`,
              `**What personal information do we process?** When you visit, use, or navigate our Services, we may process personal information depending on how you interact with Liberty Cappy and the Services, the choices you make, and the products and features you use. Learn more about [personal information you disclose to us](#personalinfo).`,
              `**Do we process any sensitive personal information?** We do not process sensitive personal information.`,
              `**Do we receive any information from third parties?** We do not receive any information from third parties.`,
              `**How do we process your information?** We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. Learn more about [how we process your information](#infouse).`,
              `**In what situations and with which parties do we share personal information?** We do not share any information with any third parties.`,
              `**What are your rights?** Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. Learn more about [your privacy rights](#privacyrights).`,
              `**How do you exercise your rights?** The easiest way to exercise your rights is by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.`,
              `Want to learn more about what Liberty Cappy does with any information we collect? [Review the privacy notice in full](#toc).`,
            ]}
          />

          <Section
            title="Table of Contents"
            id="toc"
            paragraphs={[
              `1. [What information do we collect?](#infocollect)
2. [How do we process your information?](#infouse)
3. [When and with whom do we share your personal information?](#whoshare)
4. [How long do we keep your information?](#inforetain)
5. [Do we collect information from minors?](#infominors)
6. [What are your privacy rights?](#privacyrights)
7. [Controls for do-not-track features?](#DNT)
8. [Do California residents have specific privacy rights?](#caresidents)
9. [Do we make updates to this notice?](#policyupdates)
10. [How can you contact us about this notice?](#contact)
11. [How can you review, update, or delete the data we collect from you?](#request)`,
            ]}
          />

          <Section
            title="1\. What information do we collect?"
            id="infocollect"
            paragraphs={[
              `<strong id="personalinfo">Personal information you disclose to us</strong>`,
              `***In Short:** We collect personal information that you provide to us.*`,
              `We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.`,
              `**Personal Information Provided by You.** The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:`,
              `- names\n- phone numbers\n- email addresses\n- mailing addresses`,
              `**Sensitive Information.** We do not process sensitive information.`,
              `All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.`,
            ]}
          />
          <Section
            title="2\. How do we process your information?"
            id="infouse"
            paragraphs={[
              `We may collect and process your information for the purpose of administering prize draws and sending newsletters. This includes using your provided details to select and contact winners, manage prizes, and deliver newsletters containing updates, offers, and relevant content. By participating in our prize draws or subscribing to our newsletter, you consent to the collection, processing, and use of your information for these purposes.`,
            ]}
          />
          <Section
            title="3\. When and with whom do we share your personal information?"
            id="whoshare"
            paragraphs={[
              `We highly value your privacy and want you to know that we do not share your personal information with any third parties. Your provided information is strictly used for internal purposes, such as administering our services, improving user experience, and communicating with you. Rest assured that your personal information remains confidential and is not disclosed to external entities, except where required by law or with your explicit consent.`,
            ]}
          />
          <Section
            title="4\. How long do we keep your information?"
            id="inforetain"
            paragraphs={[
              `***In Short:** We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law.*`,
              `We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).`,
              `When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.`,
            ]}
          />
          <Section
            title="5\. Do we collect information from minors?"
            id="infominors"
            paragraphs={[
              `***In Short:** We do not knowingly collect data from or market to children under 18 years of age.*`,
              `We do not knowingly solicit data from or market to children under 18 years of age. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at libertycappy@gmail.com.`,
            ]}
          />
          <Section
            title="6\. What are your privacy rights?"
            id="privacyrights"
            paragraphs={[
              `As our platform does not require the creation of user accounts, we do not collect personal information beyond what is necessary for the specific interactions you have with our website. If you have provided any information and wish to exercise your privacy rights, you can get in touch with us using the contact information provided below. You have the right to request access to any personal information we hold about you and to request its deletion. Please note that we will fulfill these requests in accordance with applicable laws and regulations.`,
              `If you have questions or comments about your privacy rights, you may email us at libertycappy@gmail.com.`,
            ]}
          />
          <Section
            title="7\. Controls for do-not-track features?"
            id="DNT"
            paragraphs={[
              `Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.`,
            ]}
          />
          <Section
            title="8\. Do California residents have specific privacy rights?"
            id="caresidents"
            paragraphs={[
              `***In Short:** Yes, if you are a resident of California, you are granted specific rights regarding access to your personal information.*`,
              `California Civil Code Section 1798.83, also known as the "Shine The Light" law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below.`,
              `If you are under 18 years of age, reside in California, and have a registered account with Services, you have the right to request removal of unwanted data that you publicly post on the Services. To request removal of such data, please contact us using the contact information provided below and include the email address associated with your account and a statement that you reside in California. We will make sure the data is not publicly displayed on the Services, but please be aware that the data may not be completely or comprehensively removed from all our systems (e.g., backups, etc.).`,
            ]}
          />
          <Section
            title="9\. Do we make updates to this notice?"
            id="policyupdates"
            paragraphs={[
              `***In Short:** Yes, we will update this notice as necessary to stay compliant with relevant laws.*`,
              `We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.`,
            ]}
          />
          <Section
            title="10\. How can you contact us about this notice?"
            id="contact"
            paragraphs={[
              `If you have questions or comments about this notice, you may email us at libertycappy@gmail.com.`,
            ]}
          />
          <Section
            title="11\. How can you review, update, or delete the data we collect from you?"
            id="request"
            paragraphs={[
              `Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, change that information, or delete it. To request to review, update, or delete your personal information, please email us at libertycappy@gmail.com.`,
            ]}
          />
          <Section
            paragraphs={[
              `This privacy policy was created using Termly's [Privacy Policy Generator](https://termly.io/products/privacy-policy-generator/).`,
            ]}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
