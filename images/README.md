# Images de la Galerie OneStory

Ce dossier contient les images utilisées dans la galerie du site OneStory.

## Images requises

Pour que la galerie fonctionne correctement, vous devez ajouter les images suivantes :

### Images principales (obligatoires)
- `ville-onestory.jpg` - Vue du centre-ville OneStory
- `vehicules-premium.jpg` - Collection de véhicules premium
- `jobs-exclusifs.jpg` - Screenshots des jobs exclusifs
- `communaute-active.jpg` - Images de la communauté en jeu
- `proprietes-luxe.jpg` - Propriétés de luxe disponibles
- `evenements-speciaux.jpg` - Événements et tournois

## Recommandations techniques

### Format et taille
- **Format** : JPG ou PNG
- **Taille recommandée** : 800x600px ou 1200x900px
- **Ratio** : 4:3 (compatible avec le CSS)
- **Poids** : Maximum 500KB par image

### Optimisation
- Compressez vos images pour réduire le temps de chargement
- Utilisez des outils comme TinyPNG ou ImageOptim
- Testez le chargement sur différents appareils

### Nommage
- Utilisez des noms descriptifs en minuscules
- Séparez les mots par des tirets (-)
- Évitez les espaces et caractères spéciaux

## Comment ajouter vos images

1. **Préparez vos images** selon les recommandations ci-dessus
2. **Renommez-les** selon la liste des images requises
3. **Placez-les** dans ce dossier (`images/`)
4. **Testez** votre site pour vérifier l'affichage

## Ajouter plus d'images

Pour ajouter plus d'images à la galerie, modifiez le fichier `index.html` en ajoutant de nouveaux éléments `gallery-item` dans la section galerie.

Exemple :
```html
<div class="gallery-item">
    <img src="images/nouvelle-image.jpg" alt="Description de l'image">
    <div class="gallery-overlay">
        <h3>Titre de l'image</h3>
        <p>Description courte</p>
    </div>
</div>
```

## Support

Si vous avez des questions sur l'organisation des images, consultez la documentation du projet ou contactez l'équipe de développement. 