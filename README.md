<div align="center">
    <h1>Pokemon App</h1>
    <img src="https://img.shields.io/github/last-commit/WinterKRALLe/PokemoniAngularIonic?style=for-the-badge&color=ffb4a2&labelColor=201a19">
    <img src="https://img.shields.io/github/stars/WinterKRALLe/PokemoniAngularIonic?style=for-the-badge&color=e6c419&labelColor=1d1b16">
    <img src="https://img.shields.io/github/repo-size/WinterKRALLe/PokemoniAngularIonic?style=for-the-badge&color=a8c7ff&labelColor=1a1b1f">
</div>

Cross-platform web/app vytvořena pomocí [Ionic frameworku](https://ionicframework.com/) a [PokeAPI](https://pokeapi.co)

<div align="center">
  <img width="40%" src="https://github.com/WinterKRALLe/PokemoniAngularIonic/blob/main/.github/homepage.png?raw=true"  />
  <img width="40%" src="https://github.com/WinterKRALLe/PokemoniAngularIonic/blob/main/.github/detailpage.png?raw=true"  />
  <img width="40%" src="https://github.com/WinterKRALLe/PokemoniAngularIonic/blob/main/.github/typespage.png?raw=true" />
  <img width="40%" src="https://github.com/WinterKRALLe/PokemoniAngularIonic/blob/main/.github/typepage.png?raw=true"  />
  <img width="40%" src="https://github.com/WinterKRALLe/PokemoniAngularIonic/blob/main/.github/searchpage.png?raw=true" />
  <img width="40%" src="https://github.com/WinterKRALLe/PokemoniAngularIonic/blob/main/.github/favoritepage.png?raw=true"  />
</div>


## Jak vybuildit apk s [capacitorem](https://capacitorjs.com/)

1. Můžete vytvořit vlastní ikonu (alespoň 1024×1024px) a splashscreen (alespoň 2732×2732px) a vložit do složky assets v root adresáři

```
assets/
├── icon. jpg|png
└── splash. jpg|png
```

Nyní příkazem vygenerujte ikony a splashscreens

```
npx capacitor-assets generate
```

2. Vybuilděte appku

```
ionic cap build android --prod
```

3. Otevře se Android Studio, nyní můžete vybuildit apk. V záložce Build -> Build APK(s)
Svoje apk naleznete v `android/app/build/outputs/apk/debug/app-debug.apk`
### Linux
Linux uživatelé budou pravděpodobně muset přidat 2 cesty do `.bashrc` nebo `.zshrc` či do jiného scriptu podle toho, jakou používáte shell, pokud:

1. si chcete spustit appku v emulátoru, je možné, že nenajde SDK

```
export ANDROID_HOME=~/Android/Sdk
```

2. se nedaří otevřít Android Studio z terminálu (`ionic cap open android`)

```
export CAPACITOR_ANDROID_STUDIO_PATH=~/.local/share/JetBrains/Toolbox/apps/android-studio/bin/studio.sh
```
