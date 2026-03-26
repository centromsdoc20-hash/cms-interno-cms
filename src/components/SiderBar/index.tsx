import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './styles.module.scss';
import logo from '../../assets/logo-CMS-site.png';

import manualAtendimento from '../../assets/Files/1.pdf';
import manualParaAtendimentoPCMSO from '../../assets/Files/2.pdf';
import manualRec from '../../assets/Files/REC/1.pdf';
import manualRec1 from '../../assets/Files/REC/3.pdf';
import manualRec2 from '../../assets/Files/REC/4.pdf';
import manualRec3 from '../../assets/Files/REC/5.pdf';
import manualRec4 from '../../assets/Files/REC/6.pdf';
import manualRec5 from '../../assets/Files/4.pdf';
import manualChamador from '../../assets/Files/REC/Início de Turno.pdf';

import preparos1 from '../../assets/Files/preparos/ECOS PREPAROS.pdf';
import preparos2 from '../../assets/Files/preparos/PREPARO EEG.pdf';
import preparos3 from '../../assets/Files/preparos/especialidades.pdf';


import assistencial from '../../assets/videos/4up.mp4';
import trabalho from '../../assets/videos/agile.mp4'
import erroAssinatura4up from '../../assets/videos/202603250854 (1).mp4'


import {
  MdLocalHospital,
  MdWork,
  MdBusiness,
  MdWhatsapp,
  MdAssignment,
  MdFileDownload,
  MdMenuBook,
  MdOpenInNew,
  MdExpandMore,
  MdExpandLess,
  MdHome,
  MdHealthAndSafety,
  MdVideoLibrary,
  MdSearch 
} from 'react-icons/md';
import { FaFileMedicalAlt } from "react-icons/fa";

interface SidebarProps {
  onSelectManual: (fileUrl: string | null) => void;
  onSelectVideo?: (videoUrl: string, title: string) => void; 
}

interface MenuItemBase {
  label: string;
  icon: React.ReactElement;
  action?: () => void;
  extern?: boolean;
  tags?: string[];
}

interface MenuItemSimple extends MenuItemBase {
  expandable?: false;
  expanded?: never;
  toggle?: never;
  children?: never;
}

interface MenuItemExpandable extends MenuItemBase {
  expandable: true;
  expanded: boolean;
  toggle: () => void;
  children: {
    label: string;
    action: () => void;
    tags?: string[];
  }[];
}

type MenuItem = MenuItemSimple | MenuItemExpandable;

interface ManualChild {
  label: string;
  file?: string;
  action?: () => void;
  tags?: string[];
}

interface VideoChild {
  label: string;
  url: string;
  action: () => void;
  duration?: string;
  tags?: string[];
}

interface ManualGroup {
  label: string;
  icon: React.ReactElement;
  expandable: boolean;
  expanded: boolean;
  toggle: () => void;
  children: ManualChild[];
  tag?: string[];
}

interface VideoGroup {
  label: string;
  icon: React.ReactElement;
  expandable: boolean;
  expanded: boolean;
  toggle: () => void;
  children: VideoChild[];    
  tag?: string[];
}

export const Sidebar = ({ onSelectManual, onSelectVideo }: SidebarProps) => {
  const location = useLocation();
  const isRecRoute = location.pathname === '/rec';
  const isExpanded = true
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [openOperadoras, setOpenOperadoras] = useState(false);
  const [openLaudos, setOpenLaudos] = useState(false);
  const [openManuaisGeral, setOpenManuaisGeral] = useState(false);
  const [openManuaisMedicos, setOpenManuaisMedicos] = useState(false);
  const [openPreparos, setOpenPreparos] = useState(false);
  const [openVideosTutoriais, setOpenVideosTutoriais] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); 

  const handleItemClick = (file: string | null, label: string) => {
    setActiveItem(label);
    onSelectManual(file);
  };

  const handleVideoClick = (videoUrl: string, title: string) => {
    setActiveItem(title);
    if (onSelectVideo) {
      onSelectVideo(videoUrl, title);
    }
  };

  const handleNavigation = (link: string, external = false, label: string) => {
    setActiveItem(label);
    if (external) {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = link;
    }
  };

  const iconColors = {
    primary: '#B62D36', 
    secondary: '#4A90E2', 
    tertiary: '#50C878',
    accent: '#FF6B35', 
    neutral: '#6C757D'
  };

  const getIconWithColor = (icon: React.ReactElement, color: keyof typeof iconColors = 'primary') => {
    return <span style={{ color: iconColors[color] }}>{icon}</span>;
  };

  const quickAccessItemsHome: MenuItem[] = [
    {
      label: 'Medicina Assistencial',
      icon: getIconWithColor(<MdLocalHospital />, 'primary'),
      action: () => handleNavigation('https://cms.4up.io/', true, 'Medicina Assistencial'),
      extern: true,
      tags: ['assistencial', '4up', 'cms', 'medicina']
    },
    {
      label: 'Medicina do Trabalho',
      icon: getIconWithColor(<MdWork />, 'secondary'),
      action: () => handleNavigation('https://centroms.agilework.com.br/Agile.MainApp/', true, 'Medicina do Trabalho'),
      extern: true,
      tags: ['trabalho', 'agile', 'pcms', 'medicina']
    },
    {
      label: 'Exames de Imagem - Animati',
      icon: getIconWithColor(<FaFileMedicalAlt />, 'accent'),
      action: () => handleNavigation('https://pacs.centroms.com.br', true, 'Raio X CMS'),
      extern: true,
      tags: ['exames', 'imagem', 'animati', 'pacs', 'raio x']
    },
   
    {
      label: 'WhatsApp',
      icon: getIconWithColor(<MdWhatsapp />, 'tertiary'),
      action: () => handleNavigation('https://centroms.sz.chat/static/signin?action=session_expired', true, 'WhatsApp'),
      extern: true,
      tags: ['whatsapp', 'chat', 'atendimento']
    },
    {
      label: 'Drive',
      icon: getIconWithColor(<MdFileDownload />, 'neutral'),
      action: () => handleNavigation('https://drive.google.com/', true, 'Drive'),
      extern: true,
      tags: ['drive', 'arquivos', 'documentos']
    }
  ];

  const quickAccessItemsRec: MenuItem[] = [
    {
      label: 'Medicina Assistencial',
      icon: getIconWithColor(<MdLocalHospital />, 'primary'),
      action: () => handleNavigation('https://cms.4up.io/', true, 'Medicina Assistencial'),
      extern: true,
      tags: ['assistencial', '4up', 'cms', 'medicina']
    },
    {
      label: 'Medicina do Trabalho',
      icon: getIconWithColor(<MdWork />, 'secondary'),
      action: () => handleNavigation('https://centroms.agilework.com.br/Agile.MainApp/', true, 'Medicina do Trabalho'),
      extern: true,
      tags: ['trabalho', 'agile', 'pcms', 'medicina']
    },
    {
      label: 'Exames de Imagem - Animati',
      icon: getIconWithColor(<FaFileMedicalAlt />, 'accent'),
      action: () => handleNavigation('https://pacs.centroms.com.br', true, 'Raio X CMS'),
      extern: true,
      tags: ['exames', 'imagem', 'animati', 'pacs', 'raio x']
    },
    {
      label: 'WhatsApp',
      icon: getIconWithColor(<MdWhatsapp />, 'tertiary'),
      action: () => handleNavigation('https://centroms.sz.chat/static/signin?action=session_expired', true, 'WhatsApp'),
      extern: true,
      tags: ['whatsapp', 'chat', 'atendimento']
    },
    {
      label: 'Operadoras',
      icon: getIconWithColor(<MdBusiness />, 'neutral'),
      expandable: true,
      expanded: openOperadoras,
      toggle: () => setOpenOperadoras((prev) => !prev),
      tags: ['operadoras', 'planos', 'convênios'],
      children: [
        {
          label: 'Doctor Clin',
          action: () => handleNavigation('https://app2.goclin.com/', true, 'Doctor Clin'),
          tags: ['doctorclin', 'operadora', 'plano']
        },
        {
          label: 'CCG',
          action: () => handleNavigation('https://saviatendimento.com.br/saviatendimento/login.faces', true, 'CCG'),
          tags: ['ccg', 'operadora', 'savia']
        },
        {
          label: 'CASSI',
          action: () => handleNavigation('https://polimed.com.br/autenticadorOrizon/loginAutenticador', true, 'CASSI'),
          tags: ['cassi', 'operadora', 'polimed']
        },
        {
          label: 'Cabergs',
          action: () => handleNavigation('https://portal.cabergs.org.br/autenticacao/', true, 'Cabergs'),
          tags: ['cabergs', 'operadora']
        },
      ],
    },
    {
      label: 'Laudos',
      icon: getIconWithColor(<MdAssignment />, 'secondary'),
      expandable: true,
      expanded: openLaudos,
      toggle: () => setOpenLaudos((prev) => !prev),
      tags: ['laudos', 'resultados', 'exames'],
      children: [
        {
          label: 'Laboratório Pagel',
          action: () => handleNavigation('https://201.56.72.83:9997/#/login-geral', true, 'Laboratório Pagel'),
          tags: ['pagel', 'laboratório', 'laudos']
        },
        {
          label: 'Eletrocardiograma - Micromed',
          action: () => handleNavigation('https://coreum.health/classic/autenticacao/codigo-acesso', true, 'Eletrocardiograma - Micromed'),
          tags: ['eletro', 'ecg', 'micromed', 'coreum']
        },
        {
          label: 'Laudo Pronto',
          action: () => handleNavigation('https://laudopronto.com.br/', true, 'Laudo Pronto'),
          tags: ['laudopronto', 'laudos']
        },
      ],
    },
    {
      label: 'Preparos Pacientes',
      icon: getIconWithColor(<MdHealthAndSafety />, 'accent'),
      expandable: true,
      expanded: openPreparos,
      toggle: () => setOpenPreparos((prev) => !prev),
      tags: ['preparos', 'pacientes', 'exames'],
      children: [
        {
          label: 'ECOS PREPAROS',
          action: () => handleItemClick(preparos1, 'ECOS PREPAROS'),
          tags: ['ecos', 'preparo', 'ecocardiograma']
        },
        {
          label: 'PREPARO EEG',
          action: () => handleItemClick(preparos2, 'PREPARO EEG'),
          tags: ['eeg', 'preparo', 'eletroencefalograma']
        },
        {
          label: 'Especialidades',
          action: () => handleItemClick(preparos3, 'Especialidades'),
          tags: ['especialidades', 'preparos', 'consultas']
        },
      ],
    },
  ];

  const externalAccessItems: MenuItem[] = [
    {
      label: 'Raio X Hospital',
      icon: getIconWithColor(<MdHealthAndSafety />, 'tertiary'),
      action: () => handleNavigation('https://www.optixone.com.br/dist/home.html', true, 'Raio X Hospital'),
      extern: true,
      tags: ['raio x', 'optixone', 'hospital', 'imagem']
    },
    {
      label: 'Operadoras',
      icon: getIconWithColor(<MdBusiness />, 'neutral'),
      expandable: true,
      expanded: openOperadoras,
      toggle: () => setOpenOperadoras((prev) => !prev),
      tags: ['operadoras', 'planos', 'convênios'],
      children: [
        {
          label: 'Doctor Clin',
          action: () => handleNavigation('https://app2.goclin.com/', true, 'Doctor Clin'),
          tags: ['doctorclin', 'operadora', 'plano']
        },
        {
          label: 'CCG',
          action: () => handleNavigation('https://saviatendimento.com.br/saviatendimento/login.faces', true, 'CCG'),
          tags: ['ccg', 'operadora', 'savia']
        },
        {
          label: 'CASSI',
          action: () => handleNavigation('https://polimed.com.br/autenticadorOrizon/loginAutenticador', true, 'CASSI'),
          tags: ['cassi', 'operadora', 'polimed']
        },
        {
          label: 'Cabergs',
          action: () => handleNavigation('https://portal.cabergs.org.br/autenticacao/', true, 'Cabergs'),
          tags: ['cabergs', 'operadora']
        },
      ],
    },
    {
      label: 'Laudos',
      icon: getIconWithColor(<MdAssignment />, 'secondary'),
      expandable: true,
      expanded: openLaudos,
      toggle: () => setOpenLaudos((prev) => !prev),
      tags: ['laudos', 'resultados', 'exames'],
      children: [
        {
          label: 'Laboratório Pagel',
          action: () => handleNavigation('https://201.56.72.83:9997/#/login-geral', true, 'Laboratório Pagel'),
          tags: ['pagel', 'laboratório', 'laudos']
        },
        {
          label: 'Eletrocardiograma - Micromed',
          action: () => handleNavigation('https://coreum.health/classic/autenticacao/codigo-acesso', true, 'Eletrocardiograma - Micromed'),
          tags: ['eletro', 'ecg', 'micromed', 'coreum']
        },
        {
          label: 'Laudo Pronto',
          action: () => handleNavigation('https://laudopronto.com.br/', true, 'Laudo Pronto'),
          tags: ['laudopronto', 'laudos']
        },
        {
          label: 'Raio X',
          action: () => handleNavigation('https://icrx.onrad.com.br/', true, 'Raio X'),
          tags: ['raio x', 'icrx', 'imagem']
        },
      ],
    },
  ];

  const manualsRecGeral: ManualGroup = {
    label: 'Manuais Gerais',
    icon: getIconWithColor(<MdFileDownload />, 'primary'),
    expandable: true,
    expanded: openManuaisGeral,
    toggle: () => setOpenManuaisGeral((prev) => !prev),
    tag: ['manuais', 'gerais', 'documentação'],
    children: [
      { 
        label: 'Medicina Assistêncial', 
        file: manualRec,
        tags: ['assistencial', 'manual', '4up']
      },
      { 
        label: 'Emissão de Notas | Mais de um pagamento', 
        file: manualRec5,
        tags: ['notas', 'pagamento', 'financeiro']
      },
      { 
        label: 'Raio X', 
        file: manualRec1,
        tags: ['raio x', 'manual', 'imagem']
      },
    ],
  };

  const manualsRecMedicos: ManualGroup = {
    label: 'Manuais Médicos',
    icon: getIconWithColor(<MdMenuBook />, 'secondary'),
    expandable: true,
    expanded: openManuaisMedicos,
    toggle: () => setOpenManuaisMedicos((prev) => !prev),
    tag: ['manuais', 'médicos', 'documentação'],
    children: [
      { 
        label: 'Manual Assistêncial', 
        file: manualRec2,
        tags: ['assistencial', 'manual', 'médico']
      },
      { 
        label: 'Medicina do Trabalho', 
        file: manualRec3,
        tags: ['trabalho', 'manual', 'pcms']
      },
      { 
        label: 'Raio X', 
        file: manualRec4,
        tags: ['raio x', 'manual', 'imagem']
      },
    ],
  };

  const videosTutoriais: VideoGroup = {
    label: 'Vídeos Tutoriais',
    icon: getIconWithColor(<MdVideoLibrary />, 'accent'),
    expandable: true,
    expanded: openVideosTutoriais,
    toggle: () => setOpenVideosTutoriais((prev) => !prev),
    tag: ['vídeos', 'tutoriais', 'treinamentos'],
    children: [
      {
        label: 'Medicina Assistencial 4UP - Vídeo Tutorial',
        url: assistencial,
        action: () => handleVideoClick(assistencial, 'Medicina Assistencial 4UP - Vídeo Tutorial'),
        duration: 'n/a',
        tags: ['vídeo', 'tutorial', 'assistencial', '4up']
      },
      {
        label: 'Medicina do Trabalho - Agile - Vídeo Tutorial',
        url: trabalho,
        action: () => handleVideoClick(trabalho, 'Medicina do Trabalho - Agile - Vídeo Tutorial'),
        duration: 'n/a',
        tags: ['vídeo', 'tutorial', 'trabalho', 'agile']
      },
      {
        label: 'Erro Assinatura 4UP - Vídeo Tutorial',
        url: erroAssinatura4up,
        action: () => handleVideoClick(erroAssinatura4up, 'Erro Assinatura 4UP - Vídeo Tutorial'),
        duration: 'n/a',
        tags: ['vídeo', 'tutorial', 'erro', 'assinatura', '4up']
      }
    ],
  };

  const manualsDefault = {
    label: 'Manuais',
    icon: getIconWithColor(<MdMenuBook />, 'primary'),
    tag: ['manuais', 'documentação'],
    children: [
      {
        label: 'Totem e Chamador de Senhas',
        file: manualChamador,
        tags: ['totem', 'chamador', 'senhas', 'manual']
      },
      { 
        label: 'Manual de Atendimento', 
        file: manualAtendimento,
        tags: ['atendimento', 'manual', 'recepção']
      },
      { 
        label: 'Atendimento PCMSO', 
        file: manualParaAtendimentoPCMSO,
        tags: ['pcms', 'atendimento', 'manual']
      },
      { 
        label: 'Emissão de Notas | Mais de um pagamento', 
        file: manualRec5,
        tags: ['notas', 'pagamento', 'financeiro']
      },
    ],
  };

  const homeItem: MenuItemSimple = {
    label: 'Início',
    icon: getIconWithColor(<MdHome />, 'primary'),
    action: () => handleNavigation('/', false, 'Início'),
    tags: ['início', 'home']
  };

  const recItem: MenuItemSimple = {
    label: 'Recepção',
    icon: getIconWithColor(<MdHealthAndSafety />, 'tertiary'),
    action: () => handleNavigation('/rec', false, 'REC'),
    tags: ['recepção', 'rec']
  };

  // Função para verificar se um item corresponde à busca
  const matchesSearch = (text: string, tags?: string[]): boolean => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    const textMatch = text.toLowerCase().includes(searchLower);
    const tagsMatch = tags?.some(tag => tag.toLowerCase().includes(searchLower)) || false;
    return textMatch || tagsMatch;
  };

  // Função para filtrar grupos de manuais
  const filterManualGroup = (group: ManualGroup): ManualGroup | null => {
    const filteredChildren = group.children.filter(child => 
      matchesSearch(child.label, child.tags)
    );
    
    if (filteredChildren.length === 0) return null;
    
    return {
      ...group,
      children: filteredChildren
    };
  };

  // Função para filtrar grupos de vídeos
  const filterVideoGroup = (group: VideoGroup): VideoGroup | null => {
    const filteredChildren = group.children.filter(child => 
      matchesSearch(child.label, child.tags)
    );
    
    if (filteredChildren.length === 0) return null;
    
    return {
      ...group,
      children: filteredChildren
    };
  };

  // Função para filtrar itens de menu
  const filterMenuItem = (item: MenuItem): MenuItem | null => {
    const itemMatches = matchesSearch(item.label, item.tags);
    
    if (item.expandable) {
      const filteredChildren = item.children.filter(child => 
        matchesSearch(child.label, child.tags)
      );
      
      if (filteredChildren.length === 0 && !itemMatches) return null;
      
      return {
        ...item,
        children: filteredChildren,
        expanded: filteredChildren.length > 0 && searchTerm !== '' ? true : item.expanded
      };
    }
    
    return itemMatches ? item : null;
  };

  // Filtrar itens
  const filteredQuickAccessItems = (isRecRoute ? quickAccessItemsRec : quickAccessItemsHome)
    .map(filterMenuItem)
    .filter((item): item is MenuItem => item !== null);

  const filteredExternalAccessItems = externalAccessItems
    .map(filterMenuItem)
    .filter((item): item is MenuItem => item !== null);

  const filteredManualsRecGeral = searchTerm ? filterManualGroup(manualsRecGeral) : manualsRecGeral;
  const filteredManualsRecMedicos = searchTerm ? filterManualGroup(manualsRecMedicos) : manualsRecMedicos;
  const filteredVideosTutoriais = searchTerm ? filterVideoGroup(videosTutoriais) : videosTutoriais;
  const filteredManualsDefault = searchTerm ? {
    ...manualsDefault,
    children: manualsDefault.children.filter(child => matchesSearch(child.label, child.tags))
  } : manualsDefault;

  return (
    <div className={`${styles.sidebar} ${isExpanded ? styles.expanded : styles.collapsed}`}>
      <div className={styles.topSection}>
        <div className={styles.logoContainer}>
          {isExpanded && <img src={logo} alt="Logo CMS" className={styles.logoImg} />}
        </div>
      </div>

      <div className={styles.scrollContainer}>
        {/* Campo de Busca */}
        <div className={styles.section}>
          {isExpanded && (
            <div className={styles.searchContainer}>
              <MdSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Buscar por nome ou tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              {searchTerm && (
                <button 
                  className={styles.clearSearch}
                  onClick={() => setSearchTerm('')}
                >
                  ×
                </button>
              )}
            </div>
          )}
        </div>

        <div className={styles.section}>
          {isExpanded && <p className={styles.sectionTitle}>Navegação</p>}
          <ul className={styles.menu}>
            <li 
              className={`${styles.menuItem} ${activeItem === 'Início' ? styles.active : ''}`}
              onClick={() => homeItem.action && homeItem.action()}
            >
              <div className={styles.menuItemContent}>
                {homeItem.icon}
                {isExpanded && <span>{homeItem.label}</span>}
              </div>
            </li>
            <li
              className={`${styles.menuItem} ${activeItem === 'REC' ? styles.active : ''}`}
              onClick={() => recItem.action && recItem.action()}
            >
              <div className={styles.menuItemContent}>
                {recItem.icon}
                {isExpanded && <span>{recItem.label}</span>}
              </div>
            </li>
          </ul>
        </div>

        <div className={styles.section}>
          {isExpanded && <p className={styles.sectionTitle}>Interno Centro Médico Sapiranga</p>}
          <ul className={styles.menu}>
            {filteredQuickAccessItems.map((item, index) => (
              <li 
                key={item.label} 
                className={`${styles.menuItem} ${activeItem === item.label ? styles.active : ''}`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div
                  className={styles.menuItemContent}
                  onClick={item.expandable ? item.toggle : () => item.action && item.action()}
                >
                  {item.icon}
                  {isExpanded && (
                    <>
                      <span>{item.label}</span>
                      {item.extern && <MdOpenInNew className={styles.externalIcon} />}
                      {item.expandable && (item.expanded ? <MdExpandLess /> : <MdExpandMore />)}
                    </>
                  )}
                </div>
                {item.expandable && item.expanded && item.children.length > 0 && (
                  <ul className={styles.submenu}>
                    {item.children.map((child, childIndex) => (
                      <li
                        key={child.label}
                        className={styles.submenuItem}
                        onClick={() => child.action()}
                        style={{ animationDelay: `${childIndex * 0.03}s` }}
                      >
                        {isExpanded && <span>{child.label}</span>}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Seção de Acessos Externos */}
        {filteredExternalAccessItems.length > 0 && (
          <div className={styles.section}>
            {isExpanded && <p className={styles.sectionTitle}>Acessos Externos</p>}
            <ul className={styles.menu}>
              {filteredExternalAccessItems.map((item, index) => (
                <li 
                  key={item.label} 
                  className={`${styles.menuItem} ${activeItem === item.label ? styles.active : ''}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div
                    className={styles.menuItemContent}
                    onClick={item.expandable ? item.toggle : () => item.action && item.action()}
                  >
                    {item.icon}
                    {isExpanded && (
                      <>
                        <span>{item.label}</span>
                        {item.extern && <MdOpenInNew className={styles.externalIcon} />}
                        {item.expandable && (item.expanded ? <MdExpandLess /> : <MdExpandMore />)}
                      </>
                    )}
                  </div>
                  {item.expandable && item.expanded && item.children.length > 0 && (
                    <ul className={styles.submenu}>
                      {item.children.map((child, childIndex) => (
                        <li
                          key={child.label}
                          className={styles.submenuItem}
                          onClick={() => child.action()}
                          style={{ animationDelay: `${childIndex * 0.03}s` }}
                        >
                          {isExpanded && <span>{child.label}</span>}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {filteredVideosTutoriais && filteredVideosTutoriais.children.length > 0 && (
          <div className={styles.section}>
            {isExpanded && <p className={styles.sectionTitle}>Treinamentos</p>}
            <ul className={styles.menu}>
              <li className={styles.menuItem}>
                <div className={styles.menuItemContent} onClick={videosTutoriais.toggle}>
                  {videosTutoriais.icon}
                  {isExpanded && (
                    <>
                      <span>{videosTutoriais.label}</span>
                      {videosTutoriais.expanded ? <MdExpandLess /> : <MdExpandMore />}
                    </>
                  )}
                </div>
                {videosTutoriais.expanded && (
                  <ul className={styles.submenu}>
                    {filteredVideosTutoriais.children.map((video, videoIndex) => (
                      <li
                        key={video.label}
                        className={`${styles.submenuItem} ${activeItem === video.label ? styles.active : ''}`}
                        onClick={() => video.action()}
                        style={{ animationDelay: `${videoIndex * 0.03}s` }}
                      >
                        {isExpanded && (
                          <div className={styles.videoMenuItem}>
                            <span>▶️ {video.label}</span>
                            {video.duration && (
                              <span className={styles.videoDuration}>{video.duration}</span>
                            )}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          </div>
        )}

        <div className={styles.section}>
          {isExpanded && <p className={styles.sectionTitle}>Documentação</p>}
          <ul className={styles.menu}>
            {isRecRoute ? (
              <>
                {filteredManualsRecGeral && filteredManualsRecGeral.children.length > 0 && (
                  <li 
                    key={filteredManualsRecGeral.label} 
                    className={styles.menuItem}
                  >
                    <div className={styles.menuItemContent} onClick={filteredManualsRecGeral.toggle}>
                      {filteredManualsRecGeral.icon}
                      {isExpanded && (
                        <>
                          <span>{filteredManualsRecGeral.label}</span>
                          {filteredManualsRecGeral.expanded ? <MdExpandLess /> : <MdExpandMore />}
                        </>
                      )}
                    </div>
                    {filteredManualsRecGeral.expanded && (
                      <ul className={styles.submenu}>
                        {filteredManualsRecGeral.children.map((manual, manualIndex) => (
                          <li
                            key={manual.label}
                            className={`${styles.submenuItem} ${activeItem === manual.label ? styles.active : ''}`}
                            onClick={() => {
                              if (manual.action) {
                                manual.action();
                              } else if (manual.file) {
                                handleItemClick(manual.file, manual.label);
                              }
                            }}
                            style={{ animationDelay: `${manualIndex * 0.03}s` }}
                          >
                            {isExpanded && <span>{manual.label}</span>}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )}
                {filteredManualsRecMedicos && filteredManualsRecMedicos.children.length > 0 && (
                  <li 
                    key={filteredManualsRecMedicos.label} 
                    className={styles.menuItem}
                  >
                    <div className={styles.menuItemContent} onClick={filteredManualsRecMedicos.toggle}>
                      {filteredManualsRecMedicos.icon}
                      {isExpanded && (
                        <>
                          <span>{filteredManualsRecMedicos.label}</span>
                          {filteredManualsRecMedicos.expanded ? <MdExpandLess /> : <MdExpandMore />}
                        </>
                      )}
                    </div>
                    {filteredManualsRecMedicos.expanded && (
                      <ul className={styles.submenu}>
                        {filteredManualsRecMedicos.children.map((manual, manualIndex) => (
                          <li
                            key={manual.label}
                            className={`${styles.submenuItem} ${activeItem === manual.label ? styles.active : ''}`}
                            onClick={() => {
                              if (manual.action) {
                                manual.action();
                              } else if (manual.file) {
                                handleItemClick(manual.file, manual.label);
                              }
                            }}
                            style={{ animationDelay: `${manualIndex * 0.03}s` }}
                          >
                            {isExpanded && <span>{manual.label}</span>}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )}
              </>
            ) : (
              filteredManualsDefault.children.map((manual, index) => (
                <li
                  key={manual.label}
                  className={`${styles.menuItem} ${activeItem === manual.label ? styles.active : ''}`}
                  onClick={() => handleItemClick(manual.file, manual.label)}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className={styles.menuItemContent}>
                    {manualsDefault.icon}
                    {isExpanded && <span>{manual.label}</span>}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};