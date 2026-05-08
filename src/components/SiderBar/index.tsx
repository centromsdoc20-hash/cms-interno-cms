import { useState, useCallback } from 'react';
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
import trabalho from '../../assets/videos/agile.mp4';
import erroAssinatura4up from '../../assets/videos/202603250854 (1).mp4';

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
  MdSearch,
  MdClose
} from 'react-icons/md';
import { FaFileMedicalAlt } from 'react-icons/fa';

interface SidebarProps {
  onSelectManual: (fileUrl: string | null) => void;
  onSelectVideo?: (videoUrl: string, title: string) => void;
}

interface SubMenuItem {
  label: string;
  action: () => void;
  tags?: string[];
}

interface MenuItem {
  label: string;
  icon: React.ReactElement;
  action?: () => void;
  isExternal?: boolean;
  tags?: string[];
  children?: SubMenuItem[];
}

interface ManualGroup {
  label: string;
  icon: React.ReactElement;
  children: {
    label: string;
    file?: string;
    action?: () => void;
    tags?: string[];
  }[];
}

export const Sidebar = ({ onSelectManual, onSelectVideo }: SidebarProps) => {
  const location = useLocation();
  const isRecRoute = location.pathname === '/rec';
  
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());
  const [expandedManuals, setExpandedManuals] = useState<Set<string>>(new Set());

  const toggleMenu = useCallback((menuLabel: string) => {
    setExpandedMenus(prev => {
      const newSet = new Set(prev);
      if (newSet.has(menuLabel)) {
        newSet.delete(menuLabel);
      } else {
        newSet.add(menuLabel);
      }
      return newSet;
    });
  }, []);

  const toggleManual = useCallback((manualLabel: string) => {
    setExpandedManuals(prev => {
      const newSet = new Set(prev);
      if (newSet.has(manualLabel)) {
        newSet.delete(manualLabel);
      } else {
        newSet.add(manualLabel);
      }
      return newSet;
    });
  }, []);

  const handleItemClick = useCallback((file: string | null, label: string) => {
    setActiveItem(label);
    onSelectManual(file);
  }, [onSelectManual]);

  const handleVideoClick = useCallback((videoUrl: string, title: string) => {
    setActiveItem(title);
    if (onSelectVideo) {
      onSelectVideo(videoUrl, title);
    }
  }, [onSelectVideo]);

  const handleNavigation = useCallback((link: string, external: boolean, label: string) => {
    setActiveItem(label);
    if (external) {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = link;
    }
  }, []);

  const matchesSearch = (text: string, tags?: string[]): boolean => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return text.toLowerCase().includes(term) || 
           (tags?.some(tag => tag.toLowerCase().includes(term)) ?? false);
  };

  const filterMenuItems = (items: MenuItem[]): MenuItem[] => {
    return items.filter(item => {
      const itemMatches = matchesSearch(item.label, item.tags);
      if (item.children) {
        const matchingChildren = item.children.filter(child => 
          matchesSearch(child.label, child.tags)
        );
        return itemMatches || matchingChildren.length > 0;
      }
      return itemMatches;
    }).map(item => {
      if (item.children) {
        return {
          ...item,
          children: item.children.filter(child => 
            matchesSearch(child.label, child.tags)
          )
        };
      }
      return item;
    });
  };

  const filterManualGroup = (group: ManualGroup): ManualGroup | null => {
    const filteredChildren = group.children.filter(child => 
      matchesSearch(child.label, child.tags)
    );
    
    if (filteredChildren.length === 0 && !matchesSearch(group.label)) return null;
    
    return {
      ...group,
      children: filteredChildren
    };
  };

  const isMenuExpanded = (label: string) => {
    if (searchTerm.trim()) return true; // Auto-expand quando pesquisando
    return expandedMenus.has(label);
  };

  const isManualExpanded = (label: string) => {
    if (searchTerm.trim()) return true;
    return expandedManuals.has(label);
  };

  // Menu items
  const quickAccessItems: MenuItem[] = [
    {
      label: 'Medicina Assistencial',
      icon: <MdLocalHospital />,
      action: () => handleNavigation('https://cms.4up.io/', true, 'Medicina Assistencial'),
      isExternal: true,
      tags: ['assistencial', '4up', 'cms', 'medicina', 'prontuário']
    },
    {
      label: 'Medicina do Trabalho',
      icon: <MdWork />,
      action: () => handleNavigation('https://centroms.agilework.com.br/Agile.MainApp/', true, 'Medicina do Trabalho'),
      isExternal: true,
      tags: ['trabalho', 'agile', 'pcms', 'ocupacional']
    },
    {
      label: 'Exames de Imagem',
      icon: <FaFileMedicalAlt />,
      action: () => handleNavigation('https://pacs.centroms.com.br', true, 'Exames de Imagem'),
      isExternal: true,
      tags: ['exames', 'imagem', 'animati', 'pacs', 'raio-x']
    },
    {
      label: 'WhatsApp',
      icon: <MdWhatsapp />,
      action: () => handleNavigation('https://centroms.sz.chat/static/signin?action=session_expired', true, 'WhatsApp'),
      isExternal: true,
      tags: ['whatsapp', 'chat', 'atendimento', 'mensagens']
    },
    {
      label: 'Buscar CEP',
      icon: <MdSearch />,
      action: () => handleNavigation('https://buscacepinter.correios.com.br/app/endereco/index.php', true, 'Buscar CEP'),
      isExternal: true,
      tags: ['cep', 'correios', 'endereço', 'consulta']
    },
    {
      label: 'Google Drive',
      icon: <MdFileDownload />,
      action: () => handleNavigation('https://drive.google.com/', true, 'Google Drive'),
      isExternal: true,
      tags: ['drive', 'arquivos', 'documentos', 'nuvem']
    }
  ];

  const recSpecificItems: MenuItem[] = [
    {
      label: 'Operadoras',
      icon: <MdBusiness />,
      tags: ['operadoras', 'convênios', 'planos'],
      children: [
        { label: 'Doctor Clin', action: () => handleNavigation('https://app2.goclin.com/', true, 'Doctor Clin'), tags: ['doctorclin'] },
        { label: 'CCG', action: () => handleNavigation('https://saviatendimento.com.br/saviatendimento/login.faces', true, 'CCG'), tags: ['ccg', 'savia'] },
        { label: 'CASSI', action: () => handleNavigation('https://polimed.com.br/autenticadorOrizon/loginAutenticador', true, 'CASSI'), tags: ['cassi', 'polimed'] },
        { label: 'Cabergs', action: () => handleNavigation('https://portal.cabergs.org.br/autenticacao/', true, 'Cabergs'), tags: ['cabergs'] }
      ]
    },
    {
      label: 'Laudos',
      icon: <MdAssignment />,
      tags: ['laudos', 'resultados', 'exames', 'diagnósticos'],
      children: [
        { label: 'Laboratório Pagel', action: () => handleNavigation('https://201.56.72.83:9997/#/login-geral', true, 'Laboratório Pagel'), tags: ['pagel', 'laboratório'] },
        { label: 'Eletrocardiograma - Micromed', action: () => handleNavigation('https://coreum.health/classic/autenticacao/codigo-acesso', true, 'Micromed'), tags: ['ecg', 'micromed', 'coreum'] },
        { label: 'Laudo Pronto', action: () => handleNavigation('https://laudopronto.com.br/', true, 'Laudo Pronto'), tags: ['laudopronto'] }
      ]
    },
    {
      label: 'Preparos Pacientes',
      icon: <MdHealthAndSafety />,
      tags: ['preparos', 'pacientes', 'exames', 'orientações'],
      children: [
        { label: 'ECOS PREPAROS', action: () => handleItemClick(preparos1, 'ECOS PREPAROS'), tags: ['ecos', 'ecocardiograma'] },
        { label: 'PREPARO EEG', action: () => handleItemClick(preparos2, 'PREPARO EEG'), tags: ['eeg', 'eletroencefalograma'] },
        { label: 'Especialidades', action: () => handleItemClick(preparos3, 'Especialidades'), tags: ['especialidades', 'consultas'] }
      ]
    }
  ];

  const externalAccessItems: MenuItem[] = [
    {
      label: 'Raio X Hospital',
      icon: <MdHealthAndSafety />,
      action: () => handleNavigation('https://www.optixone.com.br/dist/home.html', true, 'Raio X Hospital'),
      isExternal: true,
      tags: ['raio-x', 'optixone', 'hospital', 'imagem']
    }
  ];

  const manualsRecGeral: ManualGroup = {
    label: 'Manuais Gerais',
    icon: <MdFileDownload />,
    children: [
      { label: 'Medicina Assistêncial', file: manualRec, tags: ['assistencial', '4up'] },
      { label: 'Emissão de Notas', file: manualRec5, tags: ['notas', 'pagamento', 'financeiro'] },
      { label: 'Raio X', file: manualRec1, tags: ['raio-x', 'imagem'] }
    ]
  };

  const manualsRecMedicos: ManualGroup = {
    label: 'Manuais Médicos',
    icon: <MdMenuBook />,
    children: [
      { label: 'Manual Assistêncial', file: manualRec2, tags: ['assistencial', 'médico'] },
      { label: 'Medicina do Trabalho', file: manualRec3, tags: ['trabalho', 'pcms'] },
      { label: 'Raio X', file: manualRec4, tags: ['raio-x', 'imagem'] }
    ]
  };

  const videosTutoriais = [
    {
      label: 'Medicina Assistencial 4UP',
      url: assistencial,
      tags: ['vídeo', 'tutorial', 'assistencial', '4up']
    },
    {
      label: 'Medicina do Trabalho - Agile',
      url: trabalho,
      tags: ['vídeo', 'tutorial', 'trabalho', 'agile']
    },
    {
      label: 'Erro Assinatura 4UP',
      url: erroAssinatura4up,
      tags: ['vídeo', 'tutorial', 'erro', 'assinatura', '4up']
    }
  ];

  const manualsDefault = [
    { label: 'Totem e Chamador de Senhas', file: manualChamador, tags: ['totem', 'chamador'] },
    { label: 'Manual de Atendimento', file: manualAtendimento, tags: ['atendimento', 'recepção'] },
    { label: 'Atendimento PCMSO', file: manualParaAtendimentoPCMSO, tags: ['pcms', 'atendimento'] },
    { label: 'Emissão de Notas', file: manualRec5, tags: ['notas', 'pagamento'] }
  ];

  const filteredQuickAccess = filterMenuItems(quickAccessItems);
  const filteredRecItems = isRecRoute ? filterMenuItems(recSpecificItems) : [];
  const filteredExternal = filterMenuItems(externalAccessItems);
  const filteredVideos = videosTutoriais.filter(v => matchesSearch(v.label, v.tags));
  const filteredManualsDefault = manualsDefault.filter(m => matchesSearch(m.label, m.tags));
  const filteredManualsRecGeral = filterManualGroup(manualsRecGeral);
  const filteredManualsRecMedicos = filterManualGroup(manualsRecMedicos);

  return (
    <div className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logoSection}>
        <img src={logo} alt="CMS" className={styles.logo} />
      </div>

      {/* Busca */}
      <div className={styles.searchSection}>
        <div className={styles.searchWrapper}>
          <MdSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          {searchTerm && (
            <button 
              className={styles.clearButton}
              onClick={() => setSearchTerm('')}
            >
              <MdClose />
            </button>
          )}
        </div>
      </div>

      {/* Menu */}
      <div className={styles.nav}>
        {/* Navegação */}
        <div className={styles.menuSection}>
          <div className={styles.sectionTitle}>Navegação</div>
          <div 
            className={`${styles.menuItem} ${activeItem === 'Início' ? styles.active : ''}`}
            onClick={() => handleNavigation('/', false, 'Início')}
          >
            <MdHome className={styles.menuIcon} />
            <span className={styles.menuLabel}>Início</span>
          </div>
          <div 
            className={`${styles.menuItem} ${activeItem === 'REC' ? styles.active : ''}`}
            onClick={() => handleNavigation('/rec', false, 'REC')}
          >
            <MdHealthAndSafety className={styles.menuIcon} />
            <span className={styles.menuLabel}>Recepção</span>
          </div>
        </div>

        {/* Sistemas Internos */}
        {filteredQuickAccess.length > 0 && (
          <div className={styles.menuSection}>
            <div className={styles.sectionTitle}>Sistemas</div>
            {filteredQuickAccess.map((item) => (
              <div key={item.label} className={styles.menuGroup}>
                <div 
                  className={`${styles.menuItem} ${activeItem === item.label ? styles.active : ''} ${item.children ? styles.hasChildren : ''}`}
                  onClick={() => item.children ? toggleMenu(item.label) : item.action?.()}
                >
                  <span className={styles.menuIcon}>{item.icon}</span>
                  <span className={styles.menuLabel}>{item.label}</span>
                  <div className={styles.menuActions}>
                    {item.isExternal && <MdOpenInNew className={styles.externalIcon} />}
                    {item.children && (
                      isMenuExpanded(item.label) ? 
                        <MdExpandLess className={styles.expandIcon} /> : 
                        <MdExpandMore className={styles.expandIcon} />
                    )}
                  </div>
                </div>
                
                {item.children && isMenuExpanded(item.label) && (
                  <div className={styles.submenu}>
                    {item.children.map((child) => (
                      <div
                        key={child.label}
                        className={`${styles.submenuItem} ${activeItem === child.label ? styles.active : ''}`}
                        onClick={child.action}
                      >
                        {child.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Itens específicos REC */}
        {filteredRecItems.length > 0 && (
          <div className={styles.menuSection}>
            <div className={styles.sectionTitle}>Ferramentas REC</div>
            {filteredRecItems.map((item) => (
              <div key={item.label} className={styles.menuGroup}>
                <div 
                  className={`${styles.menuItem} ${activeItem === item.label ? styles.active : ''} ${item.children ? styles.hasChildren : ''}`}
                  onClick={() => item.children ? toggleMenu(item.label) : item.action?.()}
                >
                  <span className={styles.menuIcon}>{item.icon}</span>
                  <span className={styles.menuLabel}>{item.label}</span>
                  <div className={styles.menuActions}>
                    {isMenuExpanded(item.label) ? 
                      <MdExpandLess className={styles.expandIcon} /> : 
                      <MdExpandMore className={styles.expandIcon} />
                    }
                  </div>
                </div>
                
                {item.children && isMenuExpanded(item.label) && (
                  <div className={styles.submenu}>
                    {item.children.map((child) => (
                      <div
                        key={child.label}
                        className={`${styles.submenuItem} ${activeItem === child.label ? styles.active : ''}`}
                        onClick={child.action}
                      >
                        {child.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Acessos Externos */}
        {filteredExternal.length > 0 && (
          <div className={styles.menuSection}>
            <div className={styles.sectionTitle}>Acessos Externos</div>
            {filteredExternal.map((item) => (
              <div
                key={item.label}
                className={`${styles.menuItem} ${activeItem === item.label ? styles.active : ''}`}
                onClick={item.action}
              >
                <span className={styles.menuIcon}>{item.icon}</span>
                <span className={styles.menuLabel}>{item.label}</span>
                {item.isExternal && <MdOpenInNew className={styles.externalIcon} />}
              </div>
            ))}
          </div>
        )}

        {/* Vídeos Tutoriais */}
        {filteredVideos.length > 0 && (
          <div className={styles.menuSection}>
            <div className={styles.sectionTitle}>Treinamentos</div>
            {filteredVideos.map((video) => (
              <div
                key={video.label}
                className={`${styles.menuItem} ${activeItem === video.label ? styles.active : ''}`}
                onClick={() => handleVideoClick(video.url, video.label)}
              >
                <MdVideoLibrary className={styles.menuIcon} />
                <span className={styles.menuLabel}>{video.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Documentação */}
        <div className={styles.menuSection}>
          <div className={styles.sectionTitle}>Documentação</div>
          
          {isRecRoute ? (
            <>
              {filteredManualsRecGeral && (
                <div className={styles.menuGroup}>
                  <div 
                    className={`${styles.menuItem} hasChildren`}
                    onClick={() => toggleManual('Manuais Gerais')}
                  >
                    <MdFileDownload className={styles.menuIcon} />
                    <span className={styles.menuLabel}>Manuais Gerais</span>
                    <div className={styles.menuActions}>
                      {isManualExpanded('Manuais Gerais') ? 
                        <MdExpandLess className={styles.expandIcon} /> : 
                        <MdExpandMore className={styles.expandIcon} />
                      }
                    </div>
                  </div>
                  
                  {isManualExpanded('Manuais Gerais') && (
                    <div className={styles.submenu}>
                      {filteredManualsRecGeral.children.map((manual) => (
                        <div
                          key={manual.label}
                          className={`${styles.submenuItem} ${activeItem === manual.label ? styles.active : ''}`}
                          onClick={() => manual.file ? handleItemClick(manual.file, manual.label) : manual.action?.()}
                        >
                          {manual.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {filteredManualsRecMedicos && (
                <div className={styles.menuGroup}>
                  <div 
                    className={`${styles.menuItem} hasChildren`}
                    onClick={() => toggleManual('Manuais Médicos')}
                  >
                    <MdMenuBook className={styles.menuIcon} />
                    <span className={styles.menuLabel}>Manuais Médicos</span>
                    <div className={styles.menuActions}>
                      {isManualExpanded('Manuais Médicos') ? 
                        <MdExpandLess className={styles.expandIcon} /> : 
                        <MdExpandMore className={styles.expandIcon} />
                      }
                    </div>
                  </div>
                  
                  {isManualExpanded('Manuais Médicos') && (
                    <div className={styles.submenu}>
                      {filteredManualsRecMedicos.children.map((manual) => (
                        <div
                          key={manual.label}
                          className={`${styles.submenuItem} ${activeItem === manual.label ? styles.active : ''}`}
                          onClick={() => manual.file ? handleItemClick(manual.file, manual.label) : manual.action?.()}
                        >
                          {manual.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            filteredManualsDefault.map((manual) => (
              <div
                key={manual.label}
                className={`${styles.menuItem} ${activeItem === manual.label ? styles.active : ''}`}
                onClick={() => handleItemClick(manual.file, manual.label)}
              >
                <MdMenuBook className={styles.menuIcon} />
                <span className={styles.menuLabel}>{manual.label}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};