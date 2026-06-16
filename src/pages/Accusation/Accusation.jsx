import styles from "./Accusation.module.css";
import { useState } from "react";
import { useInvestigation } from "../../context/InvestigationContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "../../components/Modal/Modal.jsx";
import icon from "../../assets/icons/icon.png";
import judge from "../../assets/icons/judge.png";

function Accusation() {
  const { suspects, selectedSuspect, setSelectedSuspect, progressBar } =
    useInvestigation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (suspect) => {
    if (selectedSuspect?.id === suspect.id) {
      setSelectedSuspect(null);
    } else {
      setSelectedSuspect(suspect);
    }
  };

  const handleConfirmAccusation = () => {
    setIsModalOpen(true);
  };

  const handleModalConfirm = async () => {
    setIsModalOpen(false);

    try {
      const payload = {
        suspectId: selectedSuspect.id,
        result: "completed",
      };
      console.log(payload);

      const response = await axios.post(
        "http://localhost:5000/cases/accusation",
        payload,
      );
      console.log("Resposta da API:", response.data);

      toast.success("💥 Acusação enviada com sucesso!");
      navigate("/result", {
        state: {
          resultado: response.data.resultado,
          culpado: response.data.culpado,
          resolucao: response.data.resolucao,
        },
      });
    } catch (error) {
      console.error("Erro ao enviar acusação para a API. Erro:", error);
      toast.error("Erro ao enviar acusação.");
    }
  };

  return (
    <div className={styles.acussationContainer}>
      <h1 className={styles.acussationTitle}>Acusação Final</h1>
      <h3 className={styles.acussationSubTitle}>
        Selecione o culpado com base nos indícios revelados e depoimentos
        coletados.
      </h3>

      <div className={styles.suspectsContainer}>
        <div className={styles.suspectCardHeader}>
          <div className={styles.suspectCardHeaderIcon}>
            <img
              className={styles.suspectCardHeaderIcon}
              src={icon}
              alt="Ícone de uma pasta de arquivos semi-aberta, amarela com a folha de dentro da cor branca"
            />
          </div>
          <div className={styles.suspectCardHeaderText}>
            <h2>Instruções de Encerramento</h2>
            <h4>
              Para formalizar o encerramento do inquérito policial, você deve
              selecionar exatamente um suspeito. O botão de acusação estará
              ocultado até que você reúna conhecimento do caso.
            </h4>
          </div>
        </div>

        <div className={styles.suspectCardBody}>
          {suspects.map((suspects) => {
            const isSelected = selectedSuspect?.id === suspects.id;

            return (
              <div
                key={suspects.id}
                onClick={() => handleSelect(suspects)}
                className={`${styles.suspectCardBodyInfos} ${isSelected ? styles.btnClicked : ""}`}
              >
                <div className={styles.suspectCard}>
                  <div className={styles.cardContent}>
                    <img
                      src={suspects.image}
                      alt={`Foto de ${suspects.name}`}
                      className={styles.suspectPhoto}
                    />
                    <h3 className={styles.suspectName}>{suspects.name}</h3>
                    <p className={styles.suspectProfession}>
                      {suspects.profession || "Não informada"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {progressBar >= 20 ? (
          <span
            className={`${styles.btnAccusation} 
                                    ${!selectedSuspect ? styles.btnDisabled : ""} 
                                    ${selectedSuspect ? styles.btnAccusationOk : ""}`}
            onClick={selectedSuspect ? handleConfirmAccusation : null}
          >
            <img
              className={styles.judgeIcon}
              src={judge}
              alt="Ícone de um martelo de juiz"
            />
            <p>Realizar Acusação</p>
          </span>
        ) : (
          <div className={styles.percentageWarning}>
            🔒 Reúna pelo menos 20% das pistas para desbloquear o botão de
            Acusação Final (Progresso Atual: {progressBar}%).
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onConfirm={handleModalConfirm}
        onCancel={() => setIsModalOpen(false)}
        suspectName={selectedSuspect?.name}
      />
    </div>
  );
}

export default Accusation;
