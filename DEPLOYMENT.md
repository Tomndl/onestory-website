# 🚀 Guide de Déploiement GitHub Pages

## 📋 Prérequis

- Un compte GitHub
- Les fichiers du site dans le dossier `C:\onestory-deploy`

## 🔧 Étapes de Déploiement

### 1. Créer un Repository GitHub

1. Allez sur [github.com](https://github.com)
2. Cliquez sur le bouton **"New"** ou **"+"** en haut à droite
3. Choisissez **"New repository"**
4. Remplissez les informations :
   - **Repository name** : `onestory-website`
   - **Description** : `Site web officiel du serveur OneStory GTA RP`
   - **Public** (cochez cette option)
   - **Ne pas** cocher "Add a README file"
5. Cliquez sur **"Create repository"**

### 2. Uploadez les Fichiers

#### Méthode 1 : Interface Web (Recommandée)

1. Dans votre nouveau repository, cliquez sur **"uploading an existing file"**
2. Glissez-déposez tous les fichiers du dossier `C:\onestory-deploy` :
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
   - `.gitignore`
   - `CNAME`
3. Ajoutez un message de commit : `"Initial commit - Site OneStory"`
4. Cliquez sur **"Commit changes"**

#### Méthode 2 : GitHub Desktop

1. Téléchargez [GitHub Desktop](https://desktop.github.com/)
2. Clonez votre repository
3. Copiez tous les fichiers de `C:\onestory-deploy` dans le dossier du repository
4. Committez et poussez les changements

### 3. Activer GitHub Pages

1. Dans votre repository, allez dans **"Settings"**
2. Dans le menu de gauche, cliquez sur **"Pages"**
3. Dans **"Source"**, sélectionnez **"Deploy from a branch"**
4. Dans **"Branch"**, sélectionnez **"main"** et **"/ (root)"**
5. Cliquez sur **"Save"**

### 4. Votre Site est En Ligne !

Votre site sera accessible sur :
`https://votre-nom-utilisateur.github.io/onestory-website`

## 🌐 Nom de Domaine Personnalisé (Optionnel)

### Pour utiliser un nom de domaine personnalisé :

1. Achetez un nom de domaine (ex: `onestory.com`)
2. Dans les paramètres GitHub Pages :
   - Cochez **"Custom domain"**
   - Entrez votre nom de domaine
   - Cliquez sur **"Save"**
3. Configurez les DNS de votre domaine pour pointer vers GitHub Pages

## 📱 Vérification

1. Attendez 5-10 minutes que le site se déploie
2. Visitez votre URL GitHub Pages
3. Testez toutes les fonctionnalités :
   - Navigation entre les pages
   - Bouton FiveM
   - Design responsive
   - Animations

## 🔧 Personnalisation

### Modifier le Site

1. Modifiez les fichiers localement
2. Uploadez les changements sur GitHub
3. Le site se met à jour automatiquement

### Ajouter des Images

1. Uploadez vos images dans le repository
2. Modifiez les chemins dans `index.html`
3. Committez les changements

## 🆘 Dépannage

### Le site ne s'affiche pas
- Vérifiez que GitHub Pages est activé
- Attendez 10-15 minutes
- Vérifiez l'URL dans les paramètres

### Les styles ne se chargent pas
- Vérifiez que `styles.css` est bien uploadé
- Vérifiez les chemins dans `index.html`

### JavaScript ne fonctionne pas
- Vérifiez que `script.js` est bien uploadé
- Ouvrez la console du navigateur pour voir les erreurs

## 📞 Support

- **GitHub Pages** : [pages.github.com](https://pages.github.com)
- **Documentation GitHub** : [docs.github.com](https://docs.github.com)

---

**Votre site OneStory est maintenant en ligne ! 🎉** 