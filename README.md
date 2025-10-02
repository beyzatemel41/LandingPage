# LandingPage

Modern parfüm e-ticaret landing page'i. Angular 20 ile geliştirilmiş, Vercel'e deploy edilmeye hazır.

## 🚀 Vercel'e Deploy Etme

Bu proje Vercel'e deploy edilmeye hazır durumda. Deploy etmek için:

1. **Vercel CLI ile:**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Vercel Dashboard ile:**
   - GitHub repository'nizi Vercel'e bağlayın
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist/LandingPage/browser`
   - Framework Preset: `Angular`

3. **Otomatik Deploy:**
   - Her push'ta otomatik deploy aktif
   - Production build optimize edilmiş
   - Static asset'ler doğru yollarla yapılandırılmış

## 📁 Proje Yapısı

- `src/app/pages/landing/` - Ana landing page
- `src/app/components/` - Yeniden kullanılabilir component'ler
- `public/` - Static asset'ler (resimler, iconlar)
- `vercel.json` - Vercel yapılandırması

## 🛠️ Geliştirme

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
