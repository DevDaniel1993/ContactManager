import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Contact from "../Entites/Contact";
import contactService from "../Services/contactService";
import styles from "../Styles/ContactCard.module.css";

interface Props {
  contact: Contact;
}

const ContactCard = ({ contact }: Props) => {
  const queryClient = useQueryClient();

  const deleteContact = useMutation({
    mutationFn: (contactId: number) =>
      contactService.delete(contactId).then((res) => res.data),

    onSuccess: (_, contactId) => {
      queryClient.setQueryData<Contact[]>(["contacts"], (contacts) =>
        contacts?.filter((contact) => contact.id !== contactId)
      );
    },
  });

  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <img
        className={styles.contactPhoto}
        src={contact.photo}
        alt={`contact name : ${contact.fullname}`}
      />
      <h2 className={styles.contactName}>{contact.fullname}</h2>
      <ul className={styles.contactInfo}>
        <li className={styles.contactInfoItem}>
          <span className={styles.contactInfoItemSpan}>Phone Number :</span>
          {contact.mobile}
        </li>
        <li className={styles.contactInfoItem}>
          <span className={styles.contactInfoItemSpan}>Email Address :</span>
          {contact.email}
        </li>
        <li className={styles.contactInfoItem}>
          <span className={styles.contactInfoItemSpan}>Job :</span>
          {contact.job}
        </li>
        <li className={styles.contactInfoItem}>
          <span className={styles.contactInfoItemSpan}>Group :</span>
          {contact.group}
        </li>
      </ul>
      <div className={styles.actionButtons}>
        <button
          onClick={() => navigate(`/contacts/${contact.id}`)}
          className={[styles.btn, styles.btnShow].join(" ")}
        >
          Show
        </button>
        <button
          onClick={() => deleteContact.mutate(contact.id)}
          className={[styles.btn, styles.btnDelete].join(" ")}
        >
          Delete
        </button>
        <button className={[styles.btn, styles.btnEdit].join(" ")}>Edit</button>
      </div>
    </div>
  );
};

export default ContactCard;
